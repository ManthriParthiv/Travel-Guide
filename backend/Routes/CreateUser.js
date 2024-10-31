const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");


router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Insufficient Length").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json(false);
    }
  }
);
router.post("/loginuser",[
    body("email").isEmail(),
    body("password", "Insufficient Length").isLength({ min: 6 })]
    ,async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      let email = req.body.email;
      try {
        let userData = await User.findOne({ email });
        if (!userData) {
          return res.status(400).json({ errors: "Enter correct credentials" });
        }
        if (req.body.password !== userData.password) {
          return res.status(400).json({ errors: "Enter correct credentials" });
        }
        return res.json({ success: true });
      } catch (error) {
        console.log(error);
        res.json(false);
      }
    }
  );
module.exports = router;
