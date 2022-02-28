const express = require("express");
const logger = require("morgan");
const path = require("path");
const methodOverride = require("method-override");
const cohortsRouter = require("./routes/cohorts");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);

app.get("/", (req, res) => {
  res.redirect("/cohorts");
});

app.use("/cohorts", cohortsRouter);

const PORT = 3000;
const ADDRESS = "localhost";

app.listen(PORT, ADDRESS, () => {
  console.log(`listening on ${ADDRESS}:${PORT}`);
});
