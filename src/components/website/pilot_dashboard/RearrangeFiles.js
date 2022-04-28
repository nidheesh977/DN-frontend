import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Photo from "./Photo";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import axios from "axios";
import "./css/RearrangeFiles.css";
import { config } from "dotenv";

const domain = process.env.REACT_APP_MY_API;

/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement((item) => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery
    photos={items}
    renderImage={(props) => <SortablePhoto {...props} />}
  />
));

function RearrangeFiles(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    if (props.type === "images") {
        axios.post(`${domain}/api/user/pilotDetails`, config)
        .then((res) => {
          console.log(res.data)
          if (res.data.rearrangedImages.length === 0) {
            axios
            .post(`${domain}/api/image/getApprovedImages`, config)
            .then((response) => {
              console.log(response.data);
              setItems(response.data);
            });
          }else{
            setItems(res.data.rearrangedImages);
          }
        })
    } else if (props.type === "3dimages") {
      axios.post(`${domain}/api/user/pilotDetails`, config)
        .then((res) => {
          console.log(res.data)
          if (res.data.rearranged3d.length === 0) {
            axios
            .post(`${domain}/api/image/getApproved3d`, config)
            .then((response) => {
              console.log(response.data);
              setItems(response.data);
            });
          }else{
            setItems(res.data.rearranged3d);
          }
        })
    } else if (props.type === "videos") {
      axios.post(`${domain}/api/user/pilotDetails`, config)
        .then((res) => {
          console.log(res.data)
          if (res.data.rearrangedVideos.length === 0) {
            axios
            .post(`${domain}/api/image/getApprovedVideos`, config)
            .then((response) => {
              console.log(response.data);
              setItems(response.data);
            })
            .catch(err => {
              console.log(err)
            })
          }else{
            setItems(res.data.rearrangedVideos);
          }
        })
    }
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  const submit = () => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    var id_order = items
    console.log(id_order)
    if (props.type === "images"){
      axios.post(`${domain}/api/pilot/rearrangeImages`, {rearrangedImages: id_order}, config)
      .then(res => {
        console.log(res.data)
        props.changeValue(items)
      })
    }
    else if (props.type === "videos"){
      axios.post(`${domain}/api/pilot/rearrangeVideos`, {rearrangedVideos: id_order}, config)
      .then(res => {
        console.log(res.data)
        props.changeValue(items)
      })
    }
    if (props.type === "3dimages"){
      axios.post(`${domain}/api/pilot/rearrange3d`, {rearranged3d: id_order}, config)
      .then(res => {
        console.log(res.data)
        props.changeValue(items)
      })
    }
  }

  return (
    <div>
      <SortableGallery
        items={items}
        onSortEnd={onSortEnd}
        axis={"xy"}
        type={props.type}
      />
      {items.length > 0 ? (
        <div>
          {props.cancelButton}
          <div style = {{display: "inline-block"}} onClick = {submit}>{props.saveButton}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default RearrangeFiles;
