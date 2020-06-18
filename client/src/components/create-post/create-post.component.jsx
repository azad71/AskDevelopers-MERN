import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addPost } from "../../redux/post/post.actions";

import InputField from "../common/input-field/input-field.component";
import TextAreaField from "../common/textarea-field/textarea-field.component";

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      errors: {},
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form my-3">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <TextAreaField
                placeholder="Write something"
                name="text"
                value={this.state.text}
                handleChange={this.handleChange}
                error={errors.text}
              />

              <button type="submit" className="btn btn-dark">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreatePost;
