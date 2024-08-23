const db = require('../db/queries');
const { env, messageRequirements } = require('../config/config.js');
const { body, query, validationResult } = require('express-validator');

const errMessages = {
    alphaErr: 'must only container letters.',
    user: {
        lengthErr: `must be between 1 and ${messageRequirements.usernameLength} characters.`,
    },
    message: {
        lenghtErr: `must be between 1 and ${messageRequirements.messageLength} characteres.`,
    }
}

const validateMessage = [
    body("user").trim()
        .isAlpha().withMessage(`Username ${errMessages.alphaErr}`)
        .isLength({ min: 1, max: messageRequirements.usernameLength }).withMessage(`Username length ${errMessages.user.lengthErr}`),
    body("message").trim()
        .isLength({ min: 1, max: messageRequirements.messageLength }).withMessage(`Message length ${errMessages.message.lenghtErr}`),
]

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

const addMessage = [validateMessage,
    async function(req, res) {
        const { user, message } = req.body;
        if (user.trim().toLowerCase() === 'admin') {
            // no one can't post as an admin
            const errors = [{ msg: "Can't post as and admin." }];
            res.render("../views/pages/form.ejs",
                {
                    errors: errors,
                }
            );
            return;
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('../views/pages/form.ejs',
                {
                    errors: errors.array(),
                });
        }
        // we update the database without sanitizing the input
        const messageTimestamp = Date.now();
        const messageObj = {};
        messageObj.user = user;
        messageObj.message = message;
        messageObj.added = messageTimestamp;

        db.addMessage(messageObj);
        res.redirect("/");
    }
];

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

module.exports = { printMessages, printSingleMessage, printForm, addMessage, deleteEverything, printFormDrop, fillTables };
