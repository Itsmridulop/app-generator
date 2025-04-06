import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory"

import API from "../models/APIModel";

export const getAllAPIs = getAll(API);
export const getAPI = getOne(API);
export const createAPI = createOne(API);
export const updateAPI = updateOne(API);
export const deleteAPI = deleteOne(API);
