const { Sequelize } = require('sequelize');

// Ensure all required environment variables are present
// if (!process.env.DB_DIALECT || !process.env.DB_USER || !process.env.DB_PW || !process.env.DB_HOST || !process.env.DB_NAME) {
//     console.error("One or more required environment variables are missing.");
//     // console.log("DB_DIALECT:",DB_DIALECT)
//     // console.log("DB_USER:",DB_USER)
//     // console.log("DB_PW:",DB_PW)
//     // console.log("DB_HOST:",DB_HOST)
//     // console.log("DB_NAME:",DB_NAME)
//     process.exit(1); // Exit the application if not all environment variables are set
//   }
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mariadb',
  // dialect: process.env.DB_DIALECT
})

  
const models = [
    require('../models/todo'),
    require('../models/user'),
];

for (const model of models) {
    model(db);
}


// db.models.todo.belongsTo(db.models.user)
// db.models.user.hasMany(db.models.todo)

module.exports = db;
