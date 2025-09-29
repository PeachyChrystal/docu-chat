import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; 
import chat from "./chat.js";

dotenv.config();

const app = express();
app.use(cors());

// multer confid
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const PORT = 5001;

let filePath;

app.post("/upload", upload.single("file"), async (req, res) => {
  // file upload
  filePath = req.file.path; // file path of the uploaded file (uploads folder for oploaded pdf)
  res.send(filePath + " upload successfully.");
});

app.get("/chat", async (req, res) => {
  const resp = await chat(filePath, req.query.question); // provide file path to chat
  res.send(resp.text);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
