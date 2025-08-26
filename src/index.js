const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes'); // ✅ import routes

dotenv.config();

const app = express();
const port = 5000;

connectDB();

app.use(express.json());
app.use(cors());

// ✅ make sure to mount the routes here
app.use('/auth', authRoutes);



app.get("/", (req, res) => {
    res.send("API is running");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



