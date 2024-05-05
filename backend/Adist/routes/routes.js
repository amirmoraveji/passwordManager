import express from "express";
const router = express.Router();
import endPoints from "../controller/endPoint.js";
router.get("/getpasswords", endPoints.getALlPasswords);
router.get("/favorite", endPoints.getFavoritePasswords);
router.post("/set", endPoints.setData);
export default router;
