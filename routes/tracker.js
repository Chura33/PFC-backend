const express = require('express')
const router = express.Router()
const {
    getAllEntries,
    addTrackerEntry,
    updateTrackerEntry,
    deleteTrackerEntry,
    getSingleTrackerEntry,
    averageScoreForUser,
    startDateForUser
} = require("../controllers/tracker")

const protect = require("../middleware/auth")



router.route("/tracker/entries/").get(protect, getAllEntries)
router.route("/tracker/entry/add/").post(protect, addTrackerEntry)
router.route("/tracker/entry/:entryId").put(protect, updateTrackerEntry).delete(protect, deleteTrackerEntry).get(protect, getSingleTrackerEntry)
router.route("/tracker/score/").get(protect, averageScoreForUser)
router.route("/tracker/start/").get(protect, startDateForUser)


module.exports = router