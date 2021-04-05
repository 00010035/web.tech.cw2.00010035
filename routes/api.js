const express = require("express");
const router = express.Router();
const path = require("path");
const { root } = require("../service");
const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile(path.join(root, "DataBase/storage.json"), (err, data) => {
    if (err) throw new Error();
    var DBdata = JSON.parse(data);
    res.send(DBdata);
  });
});

router.get("/:id", (req, res) => {
  fs.readFile(path.join(root, "DataBase/storage.json"), (err, data) => {
    if (err) throw new Error();
    var id = req.params.id;
    var DBdata = JSON.parse(data);
    var filter = DBdata.filter((db) => db.id == id);
    res.send(filter);
  });
});

module.exports = router;
