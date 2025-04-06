import { Schema,InferSchemaType, Model, model } from "mongoose";

const ProjectSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    techStack: {
      frontend: [
        {
          type: String,
          required: true,
        },
      ],
      backend: [
        {
          type: String,
          required: true,
        },
      ],
      database: [
        {
          type: String,
          required: true,
        },
      ],
    },
    // settings: {
    //   authentication: { type: Boolean, default: false },
    //   databaseType: { type: String, enum: ["MongoDB", "PostgreSQL", "MySQL"] },
    //   deployment: { type: String, enum: ["Vercel", "Render", "AWS"] },
    // },
    status: {
      type: String,
      enum: ["draft", "generated", "deployed"],
      default: "draft",
    },
  },
  { timestamps: true },
);

type ProjectType = InferSchemaType<typeof ProjectSchema>;

const Project: Model<ProjectType> = model<ProjectType>(
  "Project",
  ProjectSchema,
);

export type { ProjectType };
export default Project;
