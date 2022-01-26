import { Component } from "react";
import ImgApiService from "../../services/api";
import { Gallery, Message } from "./ImageGallery.styled";
import GalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { ButtonWrapper, LoadMoreButton } from "../Button/Button.styled";
import Spinner from "../Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: Status.IDLE,
  };
  imgApiService = new ImgApiService();

  componentDidUpdate(prevProps, prevState) {
    this.imgApiService.query = this.props.request;
    const prevName = prevProps.request;
    const nextName = this.props.request;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      this.imgApiService.query = this.props.request;
      this.imgApiService.resetPage();

      this.imgApiService
        .fetchImg()
        .then((data) => {
          if (data.hits.length === 0) {
            toast.error("Nothing found on your query!", {
              theme: "colored",
            });
          }
          this.setState({ images: data.hits, status: Status.RESOLVED });
        })
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }
  }
  onLoadClick = () => {
    this.imgApiService
      .fetchImg()
      .then((data) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
        }));
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }));
  };

  render() {
    const { images, error, status } = this.state;
    const { request } = this.props;

    if (status === "idle") {
      return <Message>Please enter your query</Message>;
    }

    if (status === "pending") {
      return <Spinner></Spinner>;
    }

    if (status === "rejected") {
      return <div> {error.message} </div>;
    }

    if (status === "resolved") {
      return (
        <div>
          <Gallery>
            {images.map(({ webformatURL, largeImageURL }, index) => (
              <GalleryItem
                key={index}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                onClick={this.props.onClick}
              />
            ))}
          </Gallery>
          {this.state.images.length > 0 && this.state.images.length % 12 === 0 && (
            <ButtonWrapper>
              <LoadMoreButton type="button" onClick={this.onLoadClick}>
                Load more
              </LoadMoreButton>
            </ButtonWrapper>
          )}
        </div>
      );
    }
  }
}
