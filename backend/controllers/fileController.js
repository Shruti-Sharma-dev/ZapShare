// controllers/fileController.js
import File from "../models/file.js";

// 1️⃣ Send a file (POST /api/files/send)
export const sendFile = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.body.receiverId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!receiverId) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    const newFile = await File.create({
      sender: senderId,
      receiver: receiverId,
      filename: file.originalname,
      filepath: file.path,
      filetype: file.mimetype,
      filesize: file.size
    });

    res.status(201).json({
      message: "File sent successfully",
      file: newFile
    });
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).json({ error: "Failed to send file" });
  }
};

// 2️⃣ Get received files (GET /api/files/received)
export const getReceivedFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    const files = await File.find({ receiver: userId })
      .populate("sender", "name email") // only populate name & email
      .sort({ uploadedAt: -1 });

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching received files:", error);
    res.status(500).json({ error: "Failed to fetch received files" });
  }
};

// 3️⃣ Get sent files (GET /api/files/sent)
export const getSentFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    const files = await File.find({ sender: userId })
      .populate("receiver", "name email")
      .sort({ uploadedAt: -1 });

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching sent files:", error);
    res.status(500).json({ error: "Failed to fetch sent files" });
  }
};
