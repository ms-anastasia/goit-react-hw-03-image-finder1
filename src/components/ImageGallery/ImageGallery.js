import React from "react";

import { Gallery } from "./ImageGallery.styled";
import GalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, onClick }) => {
  return (
    <div>
      <Gallery>
        {images.map(({ webformatURL, largeImageURL }, index) => (
          <GalleryItem
            key={index}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={onClick}
          />
        ))}
      </Gallery>
    </div>
  );
};
export default ImageGallery;
