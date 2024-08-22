const express = require('express');
const defaultRouter = require('./routes/defaultRoute');
const path = require("node:path");
require('dotenv').config();

console.log(process.env.DATABASE_URL);
const app = express();
const PORT = 5000;
const assetsPath = path.join(__dirname, "public");

const messages = [
    {
        text: "Setting up!",
        user: "Chano",
        added: new Date()
    },
    {
        text: "Todo listo",
        user: "Chano",
        added: new Date()
    }
];

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use((req, res, next) => {
    res.locals.messages = messages;
    next();
});
app.use(defaultRouter);

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
