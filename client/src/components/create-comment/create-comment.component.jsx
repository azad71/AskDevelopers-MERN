import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextAreaField from "../common/textarea-field/textarea-field.component";

import { addComment } from "../../redux/post/post.actions";

class CreateComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { user } = this.props.auth;
    const { commentId } = this.props;

    const commentData = {
      name: user.name,
      avatar: user.avatar,
      text: this.state.text,
    };

    this.props.addComment(commentId, commentData);

    this.setState({ text: "" });
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="post-form my-3">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <TextAreaField
                handleChange={this.handleChange}
                value={this.state.text}
                name="text"
                placeholder="Write a comment..."
              />

              {errors && (
                <small className="text-danger py-2">{errors.text}</small>
              )}
            </div>

            <button type="submit" className="btn btn-dark my-2">
              Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}

CreateComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  commentId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (commentId, commentData) =>
    dispatch(addComment(commentId, commentData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
