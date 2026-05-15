const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb://brunodomingossantos_db_user:XI2hB3LturT7W8oM@ac-cq8g64x-shard-00-00.avahtsv.mongodb.net:27017,ac-cq8g64x-shard-00-01.avahtsv.mongodb.net:27017,ac-cq8g64x-shard-00-02.avahtsv.mongodb.net:27017/Estudo?ssl=true&replicaSet=atlas-qc1vyn-shard-0&authSource=admin&appName=Cluster0';

async function connectDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Banco conectado');
  } catch (error) {
    console.error('Erro ao conectar no banco:', error.message);
  }
}

module.exports = connectDatabase;