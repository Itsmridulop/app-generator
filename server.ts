import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import mongoose from "mongoose";

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE_REMOTE as string)
  .then(() => console.info("DB connection successful!"))
  .catch((err) => console.error(err));
