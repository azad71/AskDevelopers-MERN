import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPosts } from "../../redux/post/post.actions";

import Spinner from "../common/spinner/spinner.component";
import CreatePost from "../create-post/create-post.component";
import PostFeed from "../post-feed/post-feed.component";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <CreatePost />
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
