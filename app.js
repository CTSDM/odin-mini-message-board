const express = require("express");
const defaultRouter = require("./routes/defaultRoute");
const path = require("node:path");

const app = express();
const PORT = 5000;
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(defaultRouter);

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
