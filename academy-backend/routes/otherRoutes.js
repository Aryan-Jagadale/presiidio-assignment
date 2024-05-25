import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { contact, courseRequest } from "../controllers/otherController.js";


const router = express.Router();

router.route("/contact").post(contact);

router.route("/courserequest").post(courseRequest);


export default router;
