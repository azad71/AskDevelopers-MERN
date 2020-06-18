import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner/spinner.component";

import CreatePost from "../create-post/create-post.component";

class Posts extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <CreatePost />
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
