import React, { useState } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Photo from "./Photo";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";

export const photos = [
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
      width: 1,
      height: 1
    },
    {
      src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/PpOHJezOalU/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
      width: 4,
      height: 3
    }
  ];
  
/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement(item => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

function RearrangeFiles() {
  const [items, setItems] = useState(photos);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div>
      <h2>Sortable Gallery</h2>
      <h3>Drag photo to rearrange</h3>
      <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
    </div>
  );
}

export default RearrangeFiles