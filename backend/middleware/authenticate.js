const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: payload.id, email: payload.email };

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Unauthorized Request!" });
  }
};
