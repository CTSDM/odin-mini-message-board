const { Client } = require('pg');
const env = require('../config/config.js');
const messages = require('./stockData.js');

const values_sequences = [];

// I load this files locally so there is no need to sanitize them
for (let i = 0; i < messages.length; ++i) {
    values_sequences.push(`('${messages[i].user}', '${messages[i].text}', to_timestamp(${messages[i].added / 1000.0}))`)
}

const SQL_VALUES = 'VALUES \n' + values_sequences.join(',\n') + ';';

const SQL_CREATE = `CREATE TABLE IF NOT EXISTS ${env.database.tableName} (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    message_body VARCHAR(255),
    added timestamp);
`
const SQL_INSERT = `
    INSERT INTO ${env.database.tableName} (username, message_body, added)
    ${SQL_VALUES}
    `

async function main() {
    const client = new Client({ connectionString: env.database.url });
    await client.connect();
    await client.query(SQL_CREATE);
    await client.query(SQL_INSERT);
    await client.end();
}

module.exports = main;
