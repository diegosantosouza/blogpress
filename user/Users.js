const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    }, password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Cria a Tabela {{force}}: true =>recria a tablela toda vez, false=> se não existir ele cria senão não faz nada.
//User.sync({force:true});

module.exports = User;