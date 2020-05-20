// import dependencies
// load validators
const validateProfileInput = require("../validators/profile");
const validateExperienceInput = require("../validators/experience");
const validateEducationInput = require("../validators/education");

// load models
const Profile = require("../models/profile");
const User = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    const errors = {};
    const profile = await Profile.findOne({
      user: req.user._id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      errors.profile = "There is no profile for this user";
      return res.status(404).json(errors);
    }

    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.postProfile = async (req, res) => {
  try {
    const { errors, isValid } = validateProfileInput(req.body);
    // check for validation
    if (!isValid) return res.status(400).json(errors);
    const profile = {};
    profile.user = req.user._id;
    if (req.body.handle) profile.handle = req.body.handle;
    if (req.body.company) profile.company = req.body.company;
    if (req.body.website) profile.website = req.body.website;
    if (req.body.location) profile.location = req.body.location;
    if (req.body.bio) profile.bio = req.body.bio;
    if (req.body.status) profile.status = req.body.status;
    if (req.body.githubProfile) profile.githubProfile = req.body.githubProfile;

    // skills -> split into array
    if (typeof req.body.skills !== "undefined") {
      profile.skills = req.body.skills.split(",").map((skill) => skill.trim());
    }
    // social
    profile.social = {};

    if (req.body.youtube) profile.social.youtube = req.body.youtube;
    if (req.body.facebook) profile.social.facebook = req.body.facebook;
    if (req.body.linkedin) profile.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profile.social.twitter = req.body.twitter;
    if (req.body.instagram) profile.social.instagram = req.body.instagram;

    const searchProfile = await Profile.findOne({ user: req.user._id });
    if (searchProfile) {
      // update
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profile },
        { new: true }
      );
      return res.status(200).json(updatedProfile);
    } else {
      // create profile
      const doHandleExist = await Profile.findOne({ handle: profile.handle });
      if (doHandleExist) {
        errors.handle = "This handle already exists";
        return res.status(400).json(errors);
      }
      const newProfile = new Profile(profile);
      const savedProfile = await newProfile.save();
      return res.status(200).json(savedProfile);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProfileByHandle = async (req, res) => {
  try {
    const errors = {};

    const profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      errors.profile = "No profile found";
      return res.status(404).json(errors);
    }

    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ profile: "No profile found" });
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const errors = {};

    const profile = await (
      await Profile.findOne({ user: req.params.user_id })
    ).populate("user", ["name", "avatar"]);

    if (!profile) {
      errors.profile = "No profile found";
      return res.status(404).json(errors);
    }

    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ profile: "No profile found" });
  }
};

exports.getAllProfile = async (req, res) => {
  try {
    const errors = {};
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profiles) {
      errors.profile = "No profile found";
      return res.status(404).json(errors);
    }
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "There's problem with fetching profile" });
  }
};

exports.postAddExperience = async (req, res) => {
  try {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const profile = await Profile.findOne({ user: req.user._id });
    const experience = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };

    await profile.experience.unshift(experience);
    const updatedProfile = await profile.save();
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "There's problem with adding experiences" });
  }
};

exports.postAddEducation = async (req, res) => {
  try {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const profile = await Profile.findOne({ user: req.user._id });
    const education = {
      school: req.body.school,
      degree: req.body.degree,
      fieldOfStudy: req.body.fieldOfStudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };

    await profile.education.unshift(education);
    const updatedProfile = await profile.save();
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "There's problem with adding experiences" });
  }
};

exports.DeleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    let filteredExp = profile.experience;
    filteredExp = filteredExp.filter(
      (exp) => String(exp._id) !== String(req.params.exp_id)
    );

    profile.experience = filteredExp;

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "There's problem with adding experiences" });
  }
};

exports.DeleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    let filteredEd = profile.education;
    filteredEd = filteredEd.filter(
      (ed) => String(ed._id) !== String(req.params.ed_id)
    );

    profile.education = filteredEd;

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "There's problem with adding experiences" });
  }
};

exports.DeleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user._id });
    await User.findByIdAndRemove(req.user._id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "There's problem with adding experiences" });
  }
};
