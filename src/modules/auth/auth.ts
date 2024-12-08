import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type User = {
  id: string;
  username: string;
};

export const createJWT = (user: User) => {
  // const token
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized." });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Not authorized." });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "Not a valid token" });
  }
};

export const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};
