const express = require("express");

const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  let user = await user.save();
  return res.send();
});

module.exports = router;
