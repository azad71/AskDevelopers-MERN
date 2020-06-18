import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteEducation } from "../../redux/profile/profile.actions";

import ButtonLink from "../common/button-link/button-link.component";

import dateFormat from "../../utils/dateFormat";

class ShowEducation extends Component {
  handleDeleteEducation = (id) => {
    this.props.deleteEducation(id);
  };

  render() {
    const { educations } = this.props;

    return (
      <div>
        <div className="d-flex justify-content-between mb-2">
          <h4>Educations</h4>
          <ButtonLink
            to="/add-education"
            className="btn btn-primary"
            icon={"fa fa-plus text-white mr-1"}
          >
            Add more...
          </ButtonLink>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Instituition</th>
              <th scope="col">Degree</th>
              <th scope="col">Subject</th>
              <th scope="col">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {educations.map((ed) => (
              <tr key={ed._id}>
                <td>{ed.school}</td>
                <td>{ed.degree}</td>
                <td>{ed.fieldOfStudy}</td>
                <td>{`${dateFormat(ed.from)} - ${dateFormat(ed.to)}`}</td>
                <td>
                  <button
                    onClick={this.handleDeleteEducation.bind(this, ed._id)}
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

ShowEducation.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  educations: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteEducation: (id) => dispatch(deleteEducation(id)),
});

export default connect(null, mapDispatchToProps)(ShowEducation);
