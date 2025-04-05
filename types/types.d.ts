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

interface ProjectType extends Document {
  user: ObjectId;
  name: string;
  description: string;
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
  };
  status: string;
}

export { UserType, ProjectType };
