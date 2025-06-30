require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // <- Agregado
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true
      }
    },
    logging: false
  }
);

// Prueba la conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida exitosamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = sequelize;
