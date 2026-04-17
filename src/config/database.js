const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://brunodomingossantos_db_user:XI2hB3LturT7W8oM@cluster0.avahtsv.mongodb.net/Estudo?appName=Cluster0';

async function connectDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' Banco conectado');
  } catch (error) {
    console.error('Erro ao conectar no banco:', error.message);
  }
}

module.exports = connectDatabase;