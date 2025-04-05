import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { Model as MongooseModel } from "mongoose";

import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";
import User from "../models/user.model";

export const attachUser = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (req.body) {
        req.body.user = user?._id;
    }
    next();
};

export const deleteOne = (Model: MongooseModel<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        if (doc.user) {
            await User.findByIdAndUpdate(doc.user, {
                $pull: { projects: doc._id },
            });
        }

        res.status(204).json({
            status: "success",
            data: null,
        });
    });

export const updateOne = (Model: MongooseModel<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.params.id, req.body);
        const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!document) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: document,
            upload: res.locals,
        });
        console.log("updated");
    });

export const createOne = (Model: MongooseModel<any>) =>
    catchAsync(async (req: Request, res: Response) => {
        const doc = await Model.create(req.body);
        if (req.body.user) {
            await User.findByIdAndUpdate(req.body.user, {
                $push: { projects: doc._id },
            });
        }
        res.status(201).json({
            status: "success",
            data: doc,
        });
    });

export const getOne = (Model: MongooseModel<any>, popOptions?: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let query = Model.findById(req.params.id);
        if (popOptions && popOptions.path !== "user") {
            query = query.populate(popOptions);
        }
        const doc = await query;
        if (!doc) return next(new AppError("No document found with that ID", 404));

        res.status(200).json({
            status: "success",
            data: doc,
        });
    });

export const getAll = (Model: MongooseModel<any>) =>
    catchAsync(async (req: Request, res: Response) => {
        console.log(req.query);
        const features = new APIFeatures(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const doc = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: "success",
            results: doc.length,
            data: doc,
        });
    });
