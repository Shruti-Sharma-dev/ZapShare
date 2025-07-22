import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId, // 👈 reference to User
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId, // 👈 reference to User
    ref: 'User',
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String, // Can be local path or cloud URL
    required: true,
  },
  filetype: {
    type: String, // e.g., 'image/png', 'application/pdf'
  },
  filesize: {
    type: Number, // In bytes
  },
  status: {
    type: String,
    enum: ['sent', 'received', 'downloaded'],
    default: 'sent',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('File', fileSchema);
