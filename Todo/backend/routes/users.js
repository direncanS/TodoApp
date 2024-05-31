const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

var express = require("express");
const { SequelizeScopeError } = require("sequelize");
var router = express.Router();

router.get("/", async (req, res, next) => {
  const users = await db.models.user.findAll();

  res.status(200).json(users);
});

router.post(
  "/registerA",
  body("email").not().isEmpty().isEmail(),
  body("password").not().isEmpty().isLength({ min: 1 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    try {
      const user = await db.models.user.create({
        email: req.body.email,
        password: hashedPass,
        group: "A",
      });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      if (error && error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ error: error.errors?.[0]?.message });
      }
    }
  }
);

router.post(
  "/registerB",
  body("email").not().isEmpty().isEmail(),
  body("password").not().isEmpty().isLength({ min: 1 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    try {
      const user = await db.models.user.create({
        email: req.body.email,
        password: hashedPass,
        group: "B",
      });

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
    }
  }
);

router.post(
  "/login",
  body("email").not().isEmpty().isEmail(),
  body("password").not().isEmpty().isLength({ min: 1 }),
  async (req, res, next) => {
    console.log("req.body.email:",req.body.email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await db.models.user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid Email or password" });
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) {
      return res.status(400).json({ error: "Invalid Email or password" });
    }
    // console.log("/loginAPI:",user,isCorrect)
    // const token = jwt.sign(
    //   {
    //     user,
    //   },
    //   process.env.JWT_SECRET || "",
    //   {
    //     expiresIn: "7d",
    //   }
    // );

    // res.status(201).json({ token });
    
    const token = jwt.sign(
      { email: user.email, id: user.id }, // Include user email and id
      process.env.JWT_SECRET || "",
      { expiresIn: "7d" }
  );
  res.status(201).json({ token, email: user.email, id: user.id });
  

  }
);

module.exports = router;
