const db = require('../db/queries');
const env = require('../config/config.js');

async function printMessages(req, res) {
    const messages = await db.getAllMessages();
    res.render("../views/pages/index.ejs",
        {
            messages: messages,
        }
    );
};

const printForm = function(req, res) {
    res.render("../views/pages/form.ejs");
};

async function getPostMessage(req, res) {
    // we update the database without sanitizing the input
    const messageTimestamp = Date.now();
    const messageObj = {};
    const { user, message } = req.body;
    messageObj.user = user;
    messageObj.message = message;
    messageObj.added = messageTimestamp;

    db.addMessage(messageObj);
    res.redirect("/");
}

async function printSingleMessage(req, res) {
    // we need to update this one too
    const messageId = +req.params.id;
    // let's retrieve the data from the database
    const message = await db.getSingleMessage(messageId);
    res.render("../views/pages/message.ejs",
        {
            message: message,
        }
    );
}

const printFormDrop = function(req, res) {
    res.render("../views/pages/formDrop.ejs");
};

async function deleteEverything(req, res) {
    const { admin, password } = req.body;
    if (password === env.admin.password && admin === env.admin.username) {
        await db.dropTable();
        console.log('sucess, the database was wiped');
        res.redirect("/");
        return;
    }
    console.log("Authorization denied.");
    res.locals.errorAdmin = "The login credentials are not correct.";
    res.render("../views/pages/formDrop.ejs");
};

async function fillTables(req, res) {
    // we drop the table if exists, create a new one if it doesn't exist and fill it with stock data
    await db.dropTable();
    await db.fillTable();
    res.redirect('/');
}

module.exports = { printMessages, printSingleMessage, printForm, getPostMessage, deleteEverything, printFormDrop, fillTables };
