const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

app.use(express.json());
app.use(cors());

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