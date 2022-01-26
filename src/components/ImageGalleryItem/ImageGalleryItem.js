import React from "react";
import PropTypes from "prop-types";

import { ListItem, GalleryImage } from "./ImageGalleryItem.styled";

const GalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <ListItem onClick={() => onClick(largeImageURL)}>
      <GalleryImage src={webformatURL} alt="" width = "200" height = "200"/>
    </ListItem>
  );
};
export default GalleryItem;

GalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};