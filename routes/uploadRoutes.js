const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const { getID, root } = require("../service");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(root, "public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${getID()}.${file.mimetype.split("/")[1]}`);
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Image is not found", 400), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filter,
}).single("image");

router
  .route("/")
  .get((req, res) => {
    res.render("upload");
  })
  .post((req, res) => {
    upload(req, res, function (err) {
      if (err) {
        res.render("upload", { error: err });
      } else if (req.file == undefined) {
        res.render("upload", {
          error: "File is not found, please upload a file",
        });
      } else if (
        req.body.title.trim() == "" ||
        req.body.description.trim() == ""
      ) {
        res.render("upload", {
          error: "Please check one more time, Title or description is empty",
        });
      } else {
        var created = {
          id: getID(),
          title: req.body.title,
          path: `/images/${req.file.filename}`,
          description: req.body.description,
        };

        fs.readFile(path.join(root, "DataBase/storage.json"), (err, data) => {
          const DBdata = JSON.parse(data);
          DBdata.push(created);
          fs.writeFile(
            path.join(root, "DataBase/storage.json"),
            JSON.stringify(DBdata),
            (err) => {
              if (err) throw new Error();
            }
          );
        });

        if (err instanceof multer.MulterError) {
          res.render("upload", { error: err });
        } else if (err) {
          res.render("upload", { error: err });
        }
        // Everything went fine.
        res.render("upload", { success: true });
      }
    });
  });

module.exports = router;
