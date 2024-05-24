import DecryptToken from "./jwt.js";

export function AuthMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send("Forbidden");
  } else {
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
    const token = req.headers.authorization.split(" ")[1];
    const decryptedToken = DecryptToken(token);
    req.user = decryptedToken.payload;
  }

  next();
}
