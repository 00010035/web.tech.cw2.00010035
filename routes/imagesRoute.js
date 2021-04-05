const express = require("express");
const { root } = require("../service");
const router = express.Router();
const fs = require("fs");
const path = require("path");
router.get("/", (req, res) => {
  res.render("images");
});

router.get("/:id", (req, res) => {
  res.render("details");
});

router.get("/:id/delete", (req, res) => {
  fs.readFile(path.join(root, "DataBase/storage.json"), "utf8", (err, data) => {
    if (err) res.render("all_images", { error: err.message });

    var images_data = JSON.parse(data);

    const image_delete = images_data.filter(
      (image) => image.id == req.params.id
    );
    const images_filter = images_data.filter(
      (image) => image.id != req.params.id
    );

    fs.writeFile(
      path.join(root, "DataBase/storage.json"),
      JSON.stringify(images_filter),
      (err) => {
        if (err) res.render("images", { error: err.message });

        fs.unlink(path.join(root, "public", image_delete[0].path), (err) => {
          if (err) res.render("images", { error: err.message });
          res.render("images", { success: true });
        });
      }
    );
  });
});
module.exports = router;
