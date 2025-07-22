import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  }
});

// File filter (optional: to allow only certain file types)
const fileFilter = (req, file, cb) => {
  cb(null, true); // Accept all for now
};

// Create upload middleware
const upload = multer({
  storage,
  fileFilter
});

export default upload;
