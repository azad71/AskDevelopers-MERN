import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteExperience } from "../../redux/profile/profile.actions";

import ButtonLink from "../common/button-link/button-link.component";

import dateFormat from "../../utils/dateFormat";
import { Component } from "react";

class ShowExperience extends Component {
  handleDeleteExperience = (id) => {
    this.props.deleteExperience(id);
  };
  render() {
    const { experiences } = this.props;
    return (
      <div>
        <div className="d-flex justify-content-between mb-2">
          <h4>Experiences</h4>
          <ButtonLink
            to="/add-experience"
            className="btn btn-primary"
            icon={"fa fa-plus text-white mr-1"}
          >
            Add more...
          </ButtonLink>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>{exp.description}</td>
                <td>{`${dateFormat(exp.from)} - ${dateFormat(exp.to)}`}</td>
                <td>
                  <button
                    onClick={this.handleDeleteExperience.bind(this, exp._id)}
                    className="btn btn-danger py-0 px-1"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

ShowExperience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experiences: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExperience: (id) => dispatch(deleteExperience(id)),
});

export default connect(null, mapDispatchToProps)(ShowExperience);
