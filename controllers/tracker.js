const TrackerEntry = require("../models/TrackerEntry");
const User = require("../models/User");

const getAllEntries  = async (req, res) => {

  const { userId } = req.params;

  try {
    const entries = await TrackerEntry.find({ userId }).sort({ date: 1 });

    if (!entries.length) {
      return res.status(404).json({ message: "No tracker entries found" });
    }

    res.status(200).json({ message: "Tracker entries retrieved", tracker: entries });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

// const startTracker = async(req, res) => {
//    const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const existingEntries = await TrackerEntry.find({ userId });
//     if (existingEntries.length > 0) {
//       return res.status(400).json({ message: "Tracker has already been started" });
//     }

//     const newEntry = new TrackerEntry({
//       userId,
//       date: new Date().toISOString().split('T')[0],
//       watchedPorn: false,
//       relapseDetails: "",
//       notes: "",
//     });

//     await newEntry.save();
//     res.status(200).json({ message: "Tracker initialized", trackerEntry: newEntry });
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred", error });
//   }
// }

const addTrackerEntry = async (req, res) => {
  const { userId } = req.params;
  const { date, watchedPorn, relapseDetails, notes } = req.body;

  try {
    // Ensure the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use today's date if no date is provided
    const entryDate = date || new Date().toISOString().split('T')[0];

    // Check for an existing tracker entry for the same date
    const existingEntry = await TrackerEntry.findOne({ userId, date: entryDate });

    if (existingEntry) {
      return res.status(400).json({
        message: `An entry for the date ${entryDate} already exists.`});
    }

    // Create a new tracker entry
    const newEntry = new TrackerEntry({
      userId,
      date: entryDate,
      watchedPorn: watchedPorn || false,
      relapseDetails: relapseDetails || "",
      notes: notes || "",
    });

    await newEntry.save();

    res.status(201).json({ message: "Tracker entry added successfully", trackerEntry: newEntry });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};


const updateTrackerEntry = async (req, res) => {
  const { userId, entryId } = req.params; // Extract userId and entryId from route parameters
  const { date, watchedPorn, relapseDetails, notes } = req.body;

  try {
    // Find the tracker entry by its ID
    const trackerEntry = await TrackerEntry.findById(entryId);

    if (!trackerEntry) {
      return res.status(404).json({ message: "Tracker entry not found" });
    }

    // Verify that the tracker entry belongs to the specified user
    if (trackerEntry.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized: Tracker entry does not belong to this user" });
    }

    // Update fields only if they are provided in the request body
    if (date !== undefined) trackerEntry.date = date;
    if (watchedPorn !== undefined) trackerEntry.watchedPorn = watchedPorn;
    if (relapseDetails !== undefined) trackerEntry.relapseDetails = relapseDetails;
    if (notes !== undefined) trackerEntry.notes = notes;

    // Save the updated tracker entry
    await trackerEntry.save();

    res.status(200).json({ message: "Tracker entry updated", trackerEntry });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

const deleteTrackerEntry = async (req, res) => {
  const { userId, entryId } = req.params; // Extract userId and entryId from route parameters

  try {
    // Find the tracker entry by its ID
    const trackerEntry = await TrackerEntry.findById(entryId);

    if (!trackerEntry) {
      return res.status(404).json({ message: "Tracker entry not found" });
    }

    // Verify that the tracker entry belongs to the specified user
    if (trackerEntry.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized: Tracker entry does not belong to this user" });
    }

    // Delete the tracker entry
    await TrackerEntry.findByIdAndDelete(entryId);

    res.status(200).json({ message: "Tracker entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

const getSingleTrackerEntry = async (req, res) => {
  const { userId, entryId } = req.params; // Extract userId and entryId from route parameters

  try {
    // Find the tracker entry by its ID
    const trackerEntry = await TrackerEntry.findById(entryId);

    if (!trackerEntry) {
      return res.status(404).json({ message: "Tracker entry not found" });
    }

    // Verify that the tracker entry belongs to the specified user
    if (trackerEntry.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized: Tracker entry does not belong to this user" });
    }

    res.status(200).json({ message: "Tracker entry retrieved successfully", trackerEntry });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

const averageScoreForUser = async(req, res) => {
  const { userId} = req.params;
    try {
    const entries = await TrackerEntry.find({ userId }).sort({ date: 1 });
    if (!entries.length) {
      return res.status(404).json({ message: "No tracker entries found" });
    }

    const watchedPornDays = entries.filter(entry => !entry.watchedPorn)

    const length = entries.length
    const percentSuccess = (watchedPornDays.length / length) * 100
    res.status(200).json({"result": percentSuccess})
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

module.exports = {getAllEntries, addTrackerEntry, updateTrackerEntry, deleteTrackerEntry, getSingleTrackerEntry, averageScoreForUser}