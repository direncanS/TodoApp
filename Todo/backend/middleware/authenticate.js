// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   if (!req.headers.authorization)
//     return res.status(400).json({ error: "Unauthorized Request!" });

//   try {
//     const payload = jwt.verify(
//       req.headers.authorization.replace("Bearer ", ""),
//       process.env.JWT_SECRET
//     );

//     req.user = payload.user;
//     console.log("req.user:::::::::",req.user);

//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error: "Unauthorized Request!" });
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  // console.log("req:",req);

  // if (!req.headers.authorization)
  //   return res.status(400).json({ error: "Unauthorized Request!" });

  try {
  console.log("req:",req.headers);

    const token = req.headers.authorization.replace("Bearer ", "");
    console.log("token::::::::::::::::",token );
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming the payload includes the id and email
    req.user = { id: payload.id, email: payload.email };
    console.log("req.user:", req.user);

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Unauthorized Request!" });
  }
};
