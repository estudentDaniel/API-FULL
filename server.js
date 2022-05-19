// const mongoose = require('mongoose');
const express = require('express');
const moongose = require('mongoose');
const apiRouters = require('./router');
const cors = require('cors');

require('dotenv').config({path: 'variables.env'});
//implementar conexao com BD MONGO --> connect,
moongose.connect( process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology:true})
moongose.Promise = global.Promise;
moongose.connection.on('error',(error)=>{
    console.error("ERRO: "+error.message); 
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/',apiRouters);

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando na porta: ${process.env.PORT}`);
})
