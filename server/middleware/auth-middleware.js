import jwt from "jsonwebtoken";

const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "The user is not authenticated",
    });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token, "JWT_SECRET");
  req.user = payload;
  next();
};
