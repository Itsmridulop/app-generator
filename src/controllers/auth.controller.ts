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

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) token = req.headers.authorization.split(" ")[1];
    if (!token) return next(new AppError("please log in to get access", 401));
    const secret = String(process.env.SECRET) || "";
    interface DecodedToken {
      id: string;
      iat: number;
    }
    const decoded = jwt.verify(token, secret) as DecodedToken;
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next(new AppError("the user belonging to this token does no longer exist", 401));
    if (currentUser.changedPasswordAfter(decoded.iat)) return next(new AppError("user recently changed password, please log in again", 401));
    req.user = currentUser;
    next();
  }
)

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
