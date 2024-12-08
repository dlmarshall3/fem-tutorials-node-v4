import prisma from "../db";
import {
  comparePasswords,
  createJWT,
  hashPassword,
} from "../modules/auth/auth";
import { Request, Response } from "express";

export const createNewUser = async (
  req: Request<{ body: { username: string; password: string } }>,
  res: Response
) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (
  req: Request<{ body: { username: string; password: string } }>,
  res: Response
) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  const isValid = await comparePasswords(password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "Invalid login" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
