import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPost } from "../../redux/post/post.actions";

import Spinner from "../common/spinner/spinner.component";
import PostItem from "../post-item/post-item.component";
import CommentFeed from "../comment-feed/comment-feed.component";
import CreateComment from "../create-comment/create-comment.component";
import ButtonLink from "../common/button-link/button-link.component";

class SinglePost extends Component {
  componentDidMount() {
    const post_id = this.props.match.params.id;
    this.props.getPost(post_id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CreateComment commentId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ButtonLink to="/feed" className="btn btn-light my-3">
              Back to feed
            </ButtonLink>
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = (dispatch) => ({
  getPost: (id) => dispatch(getPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
