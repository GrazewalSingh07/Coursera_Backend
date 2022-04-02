const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    partnerLogo: { type: String, required: true },
    photoUrl: { type: String, required: true },
    partners_name: { type: String, required: true },
    language: { type: String, required: false, default: "English" },
    duration: { type: String, required: false, default: "1-4 Weeks" },
    level: { type: String, required: false, default: "Beginner" },
    subject: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Course = mongoose.model("datacoursera", courseSchema);
module.exports = Course;
