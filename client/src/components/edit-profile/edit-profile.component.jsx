import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import isEmpty from "../../utils/is-empty";

import InputField from "../common/input-field/input-field.component";
import IconInputField from "../common/icon-input-field/icon-input-field.component";
import SelectField from "../common/select-field/select-field.component";
import TextAreaField from "../common/textarea-field/textarea-field.component";
import ButtonLink from "../button-link/button-link.component";

import {
  createProfile,
  getCurrentProfile,
} from "../../redux/profile/profile.actions";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubProfile: "",
      bio: "",
      twitter: "",
      facebook: "",
      youtube: "",
      linkedin: "",
      instagram: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubProfile: this.state.githubProfile,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
    };

    this.props.createProfile(profileData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentDidUpdate(prevProps) {
    const currentProfile = this.props.profile.profile;
    const prevProfile = prevProps.profile.profile;
    // console.log(prevProps);
    if (currentProfile !== prevProfile) {
      const profile = currentProfile;

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubProfile = !isEmpty(profile.githubProfile)
        ? profile.githubProfile
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // Set component fields state

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: profile.skills.join(", "),
        githubProfile: profile.githubProfile,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      });
    }
  }

  render() {
    const { errors } = this.props;
    // select options for status
    const options = [
      { label: "*Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student", value: "Student" },
      { label: "Intern", value: "Intern" },
      { label: "Still Learning", value: "Still Learning" },
      { label: "Others", value: "Others" },
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <ButtonLink to="/dashboard" className="btn btn-primary my-3">
              Go back to Dashboard
            </ButtonLink>

            <h1 className="display-4 text-center p-3">Edit Profile</h1>

            <form onSubmit={this.handleSubmit}>
              <InputField
                type="text"
                placeholder="*Profile handler"
                name="handle"
                value={this.state.handle}
                handleChange={this.handleChange}
                error={errors.handle}
                info="This handle will generate an URL for your profile"
              />

              <SelectField
                placeholder="Status"
                name="status"
                value={this.state.status}
                handleChange={this.handleChange}
                error={errors.status}
                options={options}
              />

              <InputField
                type="text"
                placeholder="Company"
                name="company"
                value={this.state.company}
                handleChange={this.handleChange}
                error={errors.company}
              />

              <InputField
                type="text"
                placeholder="Website"
                name="website"
                value={this.state.website}
                handleChange={this.handleChange}
                error={errors.website}
              />

              <InputField
                type="text"
                placeholder="Location"
                name="location"
                value={this.state.location}
                handleChange={this.handleChange}
                error={errors.location}
              />

              <InputField
                type="text"
                placeholder="Skills"
                name="skills"
                value={this.state.skills}
                handleChange={this.handleChange}
                error={errors.skills}
                info="Please enter comma separated values (i.e. HTML, CSS, JAVASCRIPT)"
              />

              <InputField
                type="text"
                placeholder="Github profile"
                name="githubProfile"
                value={this.state.githubProfile}
                handleChange={this.handleChange}
                error={errors.githubProfile}
              />

              <TextAreaField
                type="text"
                placeholder="Tell something about yourself"
                name="bio"
                value={this.state.bio}
                handleChange={this.handleChange}
                error={errors.bio}
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    this.setState((prevState) => ({
                      displaySocialInputs: !prevState.displaySocialInputs,
                    }));
                  }}
                  className="btn btn-primary px-2 py-1"
                  style={{ borderRadius: "25px" }}
                >
                  <span>
                    <i className="fa fa-plus"></i>
                  </span>
                  {"  "}
                  Social Links
                </button>
                {"  "}
                <span className="text-muted">Optional</span>
              </div>

              {this.state.displaySocialInputs ? (
                <div>
                  <IconInputField
                    placeholder="Facebook profile url"
                    name="facebook"
                    icon="fa fa-facebook"
                    value={this.state.facebook}
                    handleChange={this.handleChange}
                    error={errors.facebook}
                  />

                  <IconInputField
                    placeholder="Twitter profile url"
                    name="twitter"
                    icon="fa fa-twitter"
                    value={this.state.twitter}
                    handleChange={this.handleChange}
                    error={errors.twitter}
                  />

                  <IconInputField
                    placeholder="Youtube profile url"
                    name="youtube"
                    icon="fa fa-youtube"
                    value={this.state.youtube}
                    handleChange={this.handleChange}
                    error={errors.youtube}
                  />

                  <IconInputField
                    placeholder="Linkedin profile url"
                    name="linkedin"
                    icon="fa fa-linkedin"
                    value={this.state.linkedin}
                    handleChange={this.handleChange}
                    error={errors.linkedin}
                  />

                  <IconInputField
                    placeholder="Instagram profile url"
                    name="instagram"
                    icon="fa fa-instagram"
                    value={this.state.instagram}
                    handleChange={this.handleChange}
                    error={errors.instagram}
                  />
                </div>
              ) : (
                ""
              )}

              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block my-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  createProfile: (profileData, history) =>
    dispatch(createProfile(profileData, history)),
  getCurrentProfile: () => dispatch(getCurrentProfile()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
