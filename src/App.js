import React, { Component } from "react";
import Container from "./components/Container/Container";
import SearchBar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import { ModalCloseButton } from "./components/Modal/Modal.styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {
    request: '',
    largeImgSrc: '',
    showModal: false,
    largeImgSrc: ""
  };

  handleFormSubmit = request => {
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
    return (
      <Container>
        <SearchBar onSubmit={this.handleFormSubmit}/>
        <ImageGallery request={this.state.request} onClick={this.onImgClick} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={this.state.largeImgSrc}
              alt=""
              width="100%"
              height="100%"
            />
            <ModalCloseButton onClick={this.toggleModal}>Close Modal</ModalCloseButton>
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
