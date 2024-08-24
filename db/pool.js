const { Pool } = require("pg");
const { env } = require("../config/config.js");

module.exports = new Pool({
    connectionString: env.database.url,
});
