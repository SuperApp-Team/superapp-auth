//this is with mongooose
const mongoose = require('mongoose');         // ⬅ Import mongoose (ODM for MongoDB)
const dotenv = require('dotenv');             // ⬅ Import dotenv to load environment variables
dotenv.config();                              // ⬅ Load variables from .env file into process.env

const connectDB = async () => {               // ⬅ Define an async function to connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB Atlas");    // ⬅ Success message
    } catch (error) {                                   // ⬅ Catch any errors during connection
        console.error("❌ MongoDB Atlas connection failed:", error); // ⬅ Print the error
        process.exit(1);                                // ⬅ Exit the program with failure
    }
};

module.exports = connectDB;   // ⬅ Export the function so index.js can use it
