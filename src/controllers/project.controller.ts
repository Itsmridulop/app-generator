import { getAll, getOne, createOne, deleteOne, updateOne } from "./handlerFactory";

import Project from "../models/project.model";

export const getProject = getOne(Project, { path: "user" });
export const createProject = createOne(Project);
export const updateProject = updateOne(Project);
export const deleteProject = deleteOne(Project);
export const getAllProjects = getAll(Project); 