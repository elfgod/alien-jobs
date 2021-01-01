const jobsCtrl = {};

// Models
const Job = require("../models/job.model");

jobsCtrl.renderJobForm = (req, res) => {
  res.render("jobs/new-job");
};

jobsCtrl.createNewJob = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title." });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }
  if (errors.length > 0) {
    res.render("jobs/new-job", {
      errors,
      title,
      description,
    });
  } else {
    const newJob = new Job({ title, description });
    newJob.user = req.user.id;
    await newJob.save();
    req.flash("success_msg", "Job Added Successfully");
    res.redirect("/jobs");
  }
};

jobsCtrl.renderJobs = async (req, res) => {
  const jobs = await Job.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("jobs/all-jobs", { jobs });
};

jobsCtrl.renderEditForm = async (req, res) => {
  const job = await Job.findById(req.params.id).lean();
  if (job.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/jobs");
  }
  res.render("jobs/edit-job", { job });
};

jobsCtrl.updateJob = async (req, res) => {
  const { title, description } = req.body;
  await Job.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Job Updated Successfully");
  res.redirect("/jobs");
};

jobsCtrl.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Job Deleted Successfully");
  res.redirect("/jobs");
};

module.exports = jobsCtrl;
