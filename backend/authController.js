const User = require("./models/User");
const Log = require("./models/Log");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("./config");

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error during registration", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "A user with this name already exists" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, password: hashPassword, role: "user" });
      await user.save();
      return res.json({ message: "User successfully registered" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Invalid password entered` });
      }
      const token = generateAccessToken(user._id);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async createLog(req, res) {
    try {
      const { project, name, message, stack, system, browser, user, date } =
        req.body;
      const log = new Log({
        project,
        name,
        message,
        stack,
        system,
        browser,
        user,
        date,
      });
      await log.save();
      return res.json({ message: "Log saved successfully" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Error" });
    }
  }

  async getLogs(req, res) {
    try {
      const logs = await Log.find();
      res.json(logs);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
