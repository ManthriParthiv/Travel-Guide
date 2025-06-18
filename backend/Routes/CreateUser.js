const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");

// Create User Route
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      });

      return res.json({ success: true });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ success: false, error: "User creation failed" });
    }
  }
);

// Login User Route
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userData = await User.findOne({ email });
      if (!userData || userData.password !== password) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      return res.json({ success: true });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ success: false, error: "Login failed" });
    }
  }
);

module.exports = router;
