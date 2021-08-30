const sequelize = require("../config/connection");
const { User, } = require("../models");
const router = require("express").Router();
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    title: "Login",
    username: req.session.username,
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    title: "Login",
    username: req.session.username,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    username: req.session.username,
  });
});


module.exports = router;
