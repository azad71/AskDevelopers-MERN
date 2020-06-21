import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteComment } from "../../redux/post/post.actions";

class CommentItem extends Component {
  handleDeleteComment = (commentId, postId) => {
    this.props.deleteComment(commentId, postId);
  };

  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt=""
            />

            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>

            {comment.user === auth.user._id ? (
              <button
                type="button"
                onClick={this.handleDeleteComment.bind(
                  this,
                  comment._id,
                  postId
                )}
                className="rounded-circle btn  mr-1"
              >
                <i className="fa text-danger fa-trash" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDisptachToProps = (dispatch) => ({
  deleteComment: (commentId, postId) =>
    dispatch(deleteComment(commentId, postId)),
});

export default connect(mapStateToProps, mapDisptachToProps)(CommentItem);
