import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import mongoose from "mongoose";
import app from "./src/app";

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE_REMOTE as string)
  .then(() => console.info("DB connection successful!"))
  .catch((err) => console.error(err));

app.listen(port, () => console.info(`Server listening on port ${port}`));
