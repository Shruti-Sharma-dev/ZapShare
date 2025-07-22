
import express from "express";
import { sendFile, getReceivedFiles, getSentFiles } from "../controllers/fileController.js";
import upload from "../middleware/multerConfig.js"; // ⬅️ Multer middleware for file upload
import authMiddleware from "../middleware/authmiddleware.js"; // ⬅️ To get logged-in user

const router = express.Router();

// ✅ Send a file
router.post("/send", authMiddleware, upload.single("file"), sendFile);

// ✅ Get received files
router.get("/received", authMiddleware, getReceivedFiles);

// ✅ Get sent files
router.get("/sent", authMiddleware, getSentFiles);

export default router;
