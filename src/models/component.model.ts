import { Schema, model, InferSchemaType, Model } from "mongoose";

const ComponentSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["button", "form", "table", "card"],
    required: true,
  },
  properties: {
    type: Object,
  },
}, { timestamps: true });

type ComponentType = InferSchemaType<typeof ComponentSchema>;

const Component: Model<ComponentType> = model("Component", ComponentSchema);

export default Component;
export type { ComponentType };
