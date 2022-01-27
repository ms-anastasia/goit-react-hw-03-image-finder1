import React, { Component } from "react";
import Container from "./components/Container/Container";
import SearchBar from "./components/Searchbar/Searchbar";
import { Message } from "./components/ImageGallery/ImageGallery.styled";
import ImgApiService from "./services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import {
  ButtonWrapper,
  LoadMoreButton,
} from "./components/Button/Button.styled";
import Spinner from "./components/Spinner/Spinner";
import Modal from "./components/Modal/Modal";
import { ModalCloseButton } from "./components/Modal/Modal.styled";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

class App extends Component {
  state = {
    request: "",
    largeImgSrc: "",
    showModal: false,
    largeImgSrc: "",
    images: null,
    error: null,
    status: Status.IDLE,
  };

  imgApiService = new ImgApiService();

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.request;
    const nextName = this.state.request;
    this.imgApiService.query = this.state.request;

    if (prevName !== nextName) {
      this.imgApiService.query = this.state.request;
      this.setState({ status: Status.PENDING });

      this.imgApiService
        .fetchImg()
        .then((data) => {
          if (data.hits.length === 0) {
            toast.error("Nothing found on your query!", {
              theme: "colored",
            });
          }
          return this.setState({ images: data.hits, status: Status.RESOLVED });
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

  handleFormSubmit = (request) => {
    this.setState({ request });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImgClick = (largeImageURL) => {
    this.toggleModal();
    this.setState({ largeImgSrc: largeImageURL });
  };

  render() {
    const { images, error, status } = this.state;
    const { request } = this.props;

    return (
      <Container>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === "idle" && <Message>Please enter your query</Message>}
        {status === "pending" && <Spinner />}
        {status === "resolved" && (
          <div>
            <ImageGallery images={images} onClick={this.onImgClick} />
            {images.length > 0 && images.length % 12 === 0 && (
              <ButtonWrapper>
                <LoadMoreButton type="button" onClick={this.onLoadClick}>
                  Load more
                </LoadMoreButton>
              </ButtonWrapper>
            )}
          </div>
        )}

        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={this.state.largeImgSrc}
              alt=""
              width="100%"
              height="100%"
            />
            <ModalCloseButton onClick={this.toggleModal}>
              Close Modal
            </ModalCloseButton>
          </Modal>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    );
  }
}
export default App;
