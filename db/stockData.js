const messages = [
    {
        text: "Setting up!",
        user: "ADMIN",
        added: 157812733000,
    },
    {
        text: "All ready",
        user: "ADMIN",
        added: 662637133000,
    },
    {
        // we are directly using this value
        // so we need to escape the single quote here so it works in POSTGRESQL
        text: "don''t shitpost",
        user: "ADMIN",
        added: 1724417685000,
    },
];

module.exports = messages;
