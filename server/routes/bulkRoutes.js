import express from "express";
import { submitBulkEnquiry, getAllEnquiries } from "../controllers/bulk.js";
//import { isAdmin } from "../middlewares/auth.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/", submitBulkEnquiry);
router.get("/", getAllEnquiries); // Only admin can see

export default router;
