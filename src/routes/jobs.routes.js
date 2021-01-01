const express = require("express");
const router = express.Router();

// Controller
const {
  renderJobForm,
  createNewJob,
  renderJobs,
  renderEditForm,
  updateJob,
  deleteJob
} = require("../controllers/jobs.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Job
router.get("/jobs/add", isAuthenticated, renderJobForm);

router.post("/jobs/new-job", isAuthenticated, createNewJob);

// Get All Jobs
router.get("/jobs", isAuthenticated, renderJobs);

// Edit Jobs
router.get("/jobs/edit/:id", isAuthenticated, renderEditForm);

router.put("/jobs/edit-job/:id", isAuthenticated, updateJob);

// Delete Jobs
router.delete("/jobs/delete/:id", isAuthenticated, deleteJob);

module.exports = router;
