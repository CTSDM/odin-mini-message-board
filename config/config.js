const env = {
    database: {
        tableName: process.env.TABLE_NAME,
        url: process.env.DATABASE_URL,
    },
    admin: {
        username: process.env.ADMIN_REMOVE,
        password: process.env.PASSWORD_REMOVE,
    }
}

const messageRequirements = {
    usernameLength: 10,
    messageLength: 255,
}

module.exports = { env, messageRequirements };
