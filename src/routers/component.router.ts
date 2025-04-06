import { Router } from "express";
import { createComponent, deleteComponent, getAllComponents, getComponent, updateComponent } from "../controllers/component.controller";

const router = Router();

router.get("/", getAllComponents);
router.get("/:id", getComponent);
router.post("/", createComponent);
router.patch("/:id", updateComponent);
router.delete("/:id", deleteComponent);

export default router;