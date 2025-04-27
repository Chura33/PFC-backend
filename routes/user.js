const express = require('express')
const router = express.Router()

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
} = require("../controllers/users")

const protect = require("../middleware/auth")

router.route("/create").post(createUser);
router.route("/login").post(loginUser)

// Protected route: Get all users (requires middleware)
// router.route('/').get(protect, getAllUsers);

router.route('/')
    .get(protect, getUserById)     // Middleware applied for GET request
    .put(protect, updateUser)     // Middleware applied for PUT request
    .delete(protect, deleteUser);



module.exports = router