import express from "express";
const router = express.Router();
import endPoints from "../controller/endPoint.js";
router.get("/", endPoints.main);
router.get("/users", endPoints.users);
export default router;
