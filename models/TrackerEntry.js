const mongoose = require("mongoose");

const TrackerEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // ISO Date string
  watchedPorn: { type: Boolean, default: false },
  relapseDetails: { type: String, default: "" },
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("TrackerEntry", TrackerEntrySchema);
