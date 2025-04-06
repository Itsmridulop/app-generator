import { Model, Schema, InferSchemaType, model } from "mongoose";

const APISchema = new Schema({
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        method: {
            type: String,
            enum: ["GET", "POST", "PUT", "DELETE"],
            required: true
        },
        endpoint: {
            type: String,
            required: true
        },
        requestBody: {
            type: Object
        },
        responseBody: {
            type: Object
        },
        authenticationRequired: {
            type: Boolean, default: false
        },
    },
    { timestamps: true }
);

type APIType = InferSchemaType<typeof APISchema>;
const API: Model<APIType> = model<APIType>("API", APISchema);

export type { APIType };
export default API;
