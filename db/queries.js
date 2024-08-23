const pool = require('./pool');
const env = require('../config/config.js');
const fillTable = require('./populatedb.js');

async function dropTable() {
    try {
        await pool.query(`DROP TABLE IF EXISTS ${env.database.tableName}`);
    } catch {
        console.log('There is no table to drop');
    }
}

async function getAllMessages() {
    try {
        const { rows } = await pool.query(`SELECT * FROM ${env.database.tableName};`);
        return rows;
    } catch {
        return undefined;
    }
}

async function addMessage(message) {
    await pool.query(`INSERT INTO ${env.database.tableName} (username, message_body, added) VALUES ($1, $2, to_timestamp($3))`, [message.user, message.message, message.added]);
}

async function getSingleMessage(messageId) {
    try {
        const { rows } = await pool.query(`SELECT * FROM ${env.database.tableName} WHERE id = $1`, [messageId])
        return rows[0];
    } catch {
        return undefined;
    }
}

module.exports = { dropTable, fillTable, getAllMessages, addMessage, getSingleMessage }
