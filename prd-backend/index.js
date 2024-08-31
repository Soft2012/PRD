const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());

// Create upload directory if doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const text = req.body.text;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send({
    fileName: file.filename,
    originalName: file.originalname,
    text,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});