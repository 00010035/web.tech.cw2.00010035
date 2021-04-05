const epxress = require("express");
const bodyParser = require("body-parser");

const uploadRoutes = require("./routes/uploadRoutes");
const imagesRoute = require("./routes/imagesRoute");
const api = require("./routes/api");

const PORT = 3000;
const app = epxress();

app.use(epxress.static("public"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("main");
});

app.use("/upload", uploadRoutes);
app.use("/image", imagesRoute);
app.use("/api/v1/image", api);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on ${PORT}`);
});
