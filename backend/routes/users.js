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

const generateJWTForUser = user => {
    const jwt_secret = process.env.JWT_SECRET
    if (!jwt_secret) {
        throw new Error("JWT_SECRET not set")
    }

    return jwt.sign(
        { email: user.email, id: user.id },
        jwt_secret,
        { expiresIn: "7d" })
}

router.post(
    "/register",
    body("email").not().isEmpty().isEmail(),
    body("password").not().isEmpty().isLength({ min: 1 }),
    body("group").not().isEmpty().isLength({ min: 1 }),
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
                group: req.body.group,
            });

            res.status(201).json({ token: generateJWTForUser(user), email: user.email, id: user.id });
        } catch (error) {
            console.error(error);
            if (error && error.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ error: error.errors?.[0]?.message });
            }
        }
    }
);

router.post(
    "/login",
    body("email").not().isEmpty().isEmail(),
    body("password").not().isEmpty().isLength({ min: 1 }),
    async (req, res, next) => {
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

        res.status(201).json({ token: generateJWTForUser(user), email: user.email, id: user.id });
    }
);

module.exports = router;
