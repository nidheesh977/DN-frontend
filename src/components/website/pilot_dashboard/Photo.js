import React from "react";
import {Col} from "react-grid-system";

const imgWithClick = { cursor: "pointer" };

const Photo = ({ index, onClick, photo, margin, direction, top, left, type }) => {
  const imgStyle = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
    imgStyle.height = "100px";
    imgStyle.width = "100px";
  }

  const handleClick = event => {
    onClick(event, { photo, index });
  };

  return (
      <Col xl = {4} lg = {6} md = {4} sm = {6} xs = {12} style = {{padding: "5px"}}>
        {photo.fileType === "video" 
            ?
            <div style = {{height: "255px"}}>
                <video 
                style={onClick ? { ...imgStyle, ...imgWithClick, width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" } : {...imgStyle, width: "100%", borderRadius: "10px", objectFit: "cover", height: "100%" }}
                src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${photo.file}`}
                onClick={onClick ? handleClick : null}
                ></video>
            </div>
            :
            <img
            style={onClick ? { ...imgStyle, ...imgWithClick, width: "100%", borderRadius: "10px" } : {...imgStyle, width: "100%", borderRadius: "10px"}}
            src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${photo.file}`}
            onClick={onClick ? handleClick : null}
            alt="img"

            />
        }
      </Col>
  );
};

export default Photo;
