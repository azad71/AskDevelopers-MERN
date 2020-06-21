import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deletePost, addLike, removeLike } from "../../redux/post/post.actions";

import ButtonLink from "../common/button-link/button-link.component";

class PostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
    };
  }

  componentDidMount() {
    const { auth, post } = this.props;

    const liked =
      post.likes.filter((like) => like.user === auth.user._id).length > 0;

    if (liked) {
      this.setState({ isLiked: true });
    }
  }

  createMarkup = () => {
    return { __html: this.props.post.text };
  };

  handleDeletePost = (id) => {
    this.props.deletePost(id);
  };

  handleAddLike = (id) => {
    this.props.addLike(id);
  };

  handleRemoveLike = (id) => {
    this.props.removeLike(id);
  };

  render() {
    const { post, auth, showActions } = this.props;
    const { isLiked } = this.state;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />

            <br />
            <p className="lead">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p dangerouslySetInnerHTML={this.createMarkup()}></p>

            {showActions ? (
              <span>
                {" "}
                <button
                  type="button"
                  onClick={this.handleAddLike.bind(this, post._id)}
                  className="btn btn-light mr-1"
                >
                  <i
                    className={`fa fa-thumbs-up ${isLiked ? "text-info" : ""}`}
                  ></i>
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                {isLiked ? (
                  <button
                    type="button"
                    onClick={this.handleRemoveLike.bind(this, post._id)}
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fa fa-thumbs-down"></i>
                  </button>
                ) : null}
                <ButtonLink
                  to={`/post/${post._id}`}
                  className="btn rounded-circle mr-1"
                  icon="fa fa-comments"
                ></ButtonLink>
                {post.user === auth.user._id ? (
                  <button
                    type="button"
                    onClick={this.handleDeletePost.bind(this, post._id)}
                    className="rounded-circle btn  mr-1"
                  >
                    <i className="fa text-danger fa-trash" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  deletePost: (id) => dispatch(deletePost(id)),
  addLike: (id) => dispatch(addLike(id)),
  removeLike: (id) => dispatch(removeLike(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
