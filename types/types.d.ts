import { Document, ObjectId } from "mongoose";

interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  projects: ObjectId[];
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
}

export { UserType };
