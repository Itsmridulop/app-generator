import Component from "../models/component.model";
import { getAll, getOne, deleteOne, updateOne, createOne } from "./handlerFactory";

export const getAllComponents = getAll(Component);
export const getComponent = getOne(Component);
export const createComponent = createOne(Component);
export const updateComponent = updateOne(Component);
export const deleteComponent = deleteOne(Component);