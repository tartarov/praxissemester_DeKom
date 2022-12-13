const jwt = require("jsonwebtoken");

formattingResponse = (token, body) => {
    let response = { token: token, body: body };
    return response;
}

exports.cookieJWTAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log("cookieToken: " + token);
  try {
    console.log("verifying user. Do you have a token?");
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log("You have a token. +++");
    next();
  } catch {
    console.log("Your Token is invalid. Please Login again. ---");
    res.clearCookie("token");
    res.send(formattingResponse(token, { value: "logout" }));

    // JSON.parse(JSON.stringify({
    // value: "logout"
  }
};
