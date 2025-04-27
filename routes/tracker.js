const express = require('express')
const router = express.Router()
const {
    getAllEntries,
    addTrackerEntry,
    updateTrackerEntry,
    deleteTrackerEntry,
    getSingleTrackerEntry,
    averageScoreForUser
} = require("../controllers/tracker")

const protect = require("../authentication/auth")



router.route("/tracker/entries/:userId").get(protect, getAllEntries)
router.route("/tracker/entry/add/:userId").post(protect, addTrackerEntry)
router.route("/tracker/entry/:userId/:entryId").put(protect, updateTrackerEntry).delete(protect, deleteTrackerEntry)
router.route("/tracker/score/:userId").get(protect, averageScoreForUser)
.get(protect, getSingleTrackerEntry)

module.exports = router