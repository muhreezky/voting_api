const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

// Import Database Model
const db = require("../models");
const { User } = db;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "696d02fff578cf",
    pass: "a9ec38aec655e5"
  }
});

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        return res.status(400).json({
          message: errors
        })
      }
      const checkUser = await User.findOne({
        where: {
          email
        }
      });
  
      if (checkUser) {
        return res.status(400).json({
          message: "E-mail already used"
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
  
      await User.create({
        name, email, password: hashed
      });

      const info = await transport.sendMail({
        from: "Example <muh.reezky@gmail.com>",
        to: email,
        subject: "Welcome",
        html: "<h1>Halo, selamat Datang</h1><br /> Semoga anda suka dengan aplikasi ini"
      });

      console.log("Message = %s", info);
  
      return res.status(201).json({
        message: "Account Created"
      });
    } catch (error) {
      return res.status(res.statusCode || 500).json({
        message: error.message
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const loginUser = await User.findOne({
        where: {
          email
        }
      });

      if (!loginUser) {
        return res.status(404).json({
          message: "User not found"
        })
      }

      const isValid = await bcrypt.compare(password, loginUser.password);

      if (!isValid) {
        return res.status(400).json({
          message: "Password Incorrect"
        })
      }

      const payload = { id: loginUser.user_id }
      const token = await jwt.sign(payload, "voting123", { expiresIn: "7d" });

      return res.status(200).json({
        message: "Login success",
        token
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

module.exports = authController;