const Sequelize = require("sequelize");

const connection = new Sequelize('blogpress', 'root', 'Y793jwLmge38xq', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;