const User = require("../models/User"); // Import the User model
const validator = require("validator");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token generation

// Controller function to handle registration
exports.registerUser = async (req, res) => {
  try {

    // Log req.body to debug
    console.log("Request body:", req.body);
    // Destructure data sent from the client (frontend)
    const { username, email, password } = req.body;
    //password length validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: "Invalid email format" });
    }

    // Check if email or username already exists
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail && existingUsername) {
      return res
        .status(409)
        .json({ message: "Email and Username already taken" });
    } else if (existingEmail) {
      return res.status(409).json({ message: "Email already in use" });
    } else if (existingUsername) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance (document)
    const user = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await user.save();

    // Optionally, you can generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });
    // Send back a success response
    res.status(201).json({ message: "User created", token });
  } catch (err) {
    // Check for duplicate key error (email or username)
    // if (err.code === 11000) {
    //   const duplicateField = Object.keys(err.keyPattern)[0];

    //   if (duplicateField === 'email') {
    //     return res.status(409).json({ message: "Email already in use" });
    //   } else if (duplicateField === 'username') {
    //     return res.status(409).json({ message: "Username already taken" });
    //   } else {
    //     return res.status(409).json({ message: "Duplicate value found" });
    //   }
    // }

    // Generic error
    console.error("Registration error:", err); // Log the error
    res.status(500).json({ message: "Something went wrong on the server" });
  }
  // console.error("Register error:", err);  // <--- add this line for debugging

  // // If something goes wrong, send back an error response
  // res.status(500).json({ message: "User });creation failed", error: err.message
};

// Controller function to handle login
exports.loginUser = async (req, res) => {
  try {
    // Destructure data sent from the client (frontend)
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, send back an error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Check if the password is correct
    // if (user.password !== password) {
    //   return res.status(401).json({ message: "Incorrect password" });
    // }

    // Optionally, you can generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    // Send back a success response
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err); // <--- add this line for debugging

    // If something goes wrong, send back an error response
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

//to handle logged in user profile
exports.getProfile = async (req, res) => {
  try {
    // req.user is set in the authMiddleware after token verification
    const userId = req.user.userId;

    // Fetch user details from the database
    const user = await User.findById(userId); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};  
