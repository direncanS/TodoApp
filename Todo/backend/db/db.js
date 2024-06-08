const { Sequelize } = require('sequelize');

console.log("DB_DIALECT:", process.env.DB_DIALECT)
console.log("DB_USER:", process.env.DB_USER)
console.log("DB_PW:", process.env.DB_PW)
console.log("DB_HOST:", process.env.DB_HOST)
console.log("DB_NAME:", process.env.DB_NAME)
console.log("DB_PORT:", process.env.DB_PORT)
if (!process.env.DB_DIALECT || !process.env.DB_USER || !process.env.DB_PW || !process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_PORT) {
    console.error("One or more required environment variables are missing.");
    process.exit(1);
}

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
})


const models = [
    require('../models/todo'),
    require('../models/user'),
];

for (const model of models) {
    model(db);
}

module.exports = db;
