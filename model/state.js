const mongoose = require('mongoose');
mongoose.Promisse = global.Promise;

const modelShema = new mongoose.Schema({//Esqueleto  do bd
    name: String
});

const modelName = 'states';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];//Conexão
}else{
    module.exports = mongoose.model(modelName,modelShema);//Criar nova conexão
    // (x,y) x: nome, y: estrutura
}
