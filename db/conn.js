const { Sequelize } =  require('sequelize');


const sequelize = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Banco conectado');
} catch (error) {
    console.log(error);
}

module.exports = sequelize;