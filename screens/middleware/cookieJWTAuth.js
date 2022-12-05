const jwt = require("jsonwebtoken");

export function cookieJWTAuth(req, res, next){
const token = req.cookies.token
try{
const user = jwt.verify(token. process.env.JWT_SECRET)
req.user = user;
next();
}catch{
res.clearToken("token");
return navigation.navigate("Login");
}
}