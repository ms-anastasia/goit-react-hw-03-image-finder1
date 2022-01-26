import React from "react";
import { Component } from "react";
import {
  SearchHeader,
  SearchForm,
  SearchButton,
  SearchLabel,
  SearchInput,
} from "./Searchbar.styled";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class SearchBar extends Component {
  state = {
    request: "",
  };

  handleNameChange = (event) => {
    this.setState({ request: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.request.trim() === "") {
      toast.error("Please enter your query!", {
        theme: "colored",
      });
      return;
    }

    this.props.onSubmit(this.state.request);
    this.setState({ request: "" });
  };

  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchLabel>Search</SearchLabel>
          </SearchButton>
          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.request}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}
