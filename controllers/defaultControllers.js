const printMessages = function(req, res) {
    res.render("../views/pages/index.ejs");
};

const printForm = function(req, res) {
    res.render("../views/pages/form.ejs");
};

const getPostMessage = function(req, res) {
    res.locals.messages.push({
        text: req.body.message,
        user: req.body.user,
        added: new Date(),
    });
    res.redirect("/");
}

module.exports = { printMessages, printForm, getPostMessage };
