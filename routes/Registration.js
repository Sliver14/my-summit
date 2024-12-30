const express = require("express");
const router = express.Router();
const { Registration } = require("../models");
const { Sequelize, ValidationError, UniqueConstraintError } = require("sequelize");


// Route to create a new registration
router.post("/", async (req, res) => {
    const post = req.body;

    try {
        // Attempt to create a new registration
        const newRegistration = await Registration.create(post);
        res.status(201).json({message: 'User created successfully', newRegistration});
    } catch (error) {
        // Check if the error is related to a unique constraint violation
        if (error instanceof ValidationError) {
           return res.status(400).json({error: error.errors[0].message});
        } if (error instanceof UniqueConstraintError) {
          return res.status(409).json({error:"Email/Phone Number already exists"});
        }
            // Handle other errors
           res.status(500).json({ error: "An unexpected error occurred." }); 
    }
});


router.use((err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({ error: err.message || "internal Server Error"});
})

module.exports = router;
