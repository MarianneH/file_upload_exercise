const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload_files", upload.single("File"), uploadFiles);

function uploadFiles(req, res) {
  const { originalname } = req.file;
  const { filename } = req.file;

  fs.rename(`uploads/${filename}`, `uploads/${originalname}`, (err) => {
    if (err) throw err;
    res.send("File uploaded");
    console.log(`File uploaded!`);
  });
}
app.listen(5001, () => {
  console.log(`Server started...`);
});
