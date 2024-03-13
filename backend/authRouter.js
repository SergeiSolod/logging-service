const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("./middlewaree/authMiddleware");

router.post(
  "/registration",
  [
    check("username", "Username cannot be empty").notEmpty(),
    check(
      "password",
      "Password must be more than 4 and less than 10 characters",
    ).isLength({ min: 4, max: 50 }),
  ],
  controller.registration,
);
router.post("/login", controller.login);
router.post("/log", controller.createLog);
router.get("/logs", authMiddleware, controller.getLogs);

module.exports = router;
