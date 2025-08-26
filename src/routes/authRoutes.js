const express = require('express');                 // Import Express
const { registerUser, loginUser,getProfile } = require('../controllers/authController'); // Import registerUser function
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router(); // Create a new router

// When POST request is sent to /register → run registerUser
router.post('/register', registerUser);
router.post('/login', loginUser); // ✅ New login route
router.get('/profile',authenticateToken, getProfile); // ✅ New profile route


module.exports = router; // Export so index.js can use these routes
