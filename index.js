const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

app.use(express.json());
app.use(cors());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "build")));

//Catch all route to serve index.html for react router routes
app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


const db = require("./models");

// Routers
const registrationRouter = require("./routes/Registration");
app.use("/registration", registrationRouter);

const PORT = process.env.DATABASE_PORT || 3001; // Use PORT from environment or default to 3001

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});