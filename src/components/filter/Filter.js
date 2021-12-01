import React, { useState, Component, useEffect, useCallback } from "react";
import GalleryFilter from "./GalleryFilter";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.id,
      categories: "1",
    };
  }
  render() {
    return (
      <>
        <GalleryFilter user={this.props.id} />
      </>
    );
  }
}
