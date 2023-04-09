const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

const routes = require("express").Router();
const { authController } = require("../controller");
const { verifyToken, checkPrivilege } = require("../middleware/auth");

routes.post(
  "/register",
  body("name").isString(),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  authController.register
);

routes.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  authController.login
);

routes.post("/token", verifyToken, (req, res) => {
  return res.status(200).json({
    id: req.user.id
  });
})

module.exports = routes;