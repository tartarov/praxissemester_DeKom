const jwt = require("jsonwebtoken");
const {formattingResponse} = require("./Formatter")

exports.cookieJWTAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log("cookieToken: " + token);
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch {
    res.clearCookie("token");
    res.send(formattingResponse(token, { value: "logout" }));
  }
};
