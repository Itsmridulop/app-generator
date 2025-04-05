import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

import User from "../models/user.model";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";

const signToken = (id: string) => {
  const secret = (process.env.SECRET as string) || "";
  const expiresIn = "30d";
  const token = jwt.sign({ id }, secret, {
    expiresIn,
  });
  return token;
};

export const signup = catchAsync(async (req: Request, res: Response) => {
  const newUser = await User.create(req.body);
  const token = signToken(String(newUser._id));
  res.status(201).json({
    data: newUser,
    token,
  });
});

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError("incorrect email or password", 401));
    const token = signToken(String(user._id));
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      user: userData,
      token,
    });
  },
);
