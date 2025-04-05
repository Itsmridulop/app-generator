import { Schema, Model, model, Query } from "mongoose";
import { UserType } from "../../types/types";

import bcrypt from "bcryptjs";

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "This name is already taken"],
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "This email is already taken"],
    },
    password: {
      type: String,
      required: [true, "This field is required"],
      min: [8, "Password must be at least 8 characters long"],
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true },
);

UserSchema.pre(/^find/, function (this: Query<any, any>,next) {
  this.populate({
    path: "projects",
    select: "-__v -createdAt -updatedAt",
  });
  next();
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(`${this.password}`, 10);
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User: Model<UserType> = model<UserType>("User", UserSchema);

export default User;
