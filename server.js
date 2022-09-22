const express = require('express');
const routes = require('./model/banco');
const server = express();
const bodyParser = require('body-parser');


server.use(express.json());//trabalha com o caminho de rota
server.use(bodyParser.urlencoded({extended: true}));
server.use(routes,()=>{});
server.listen(3000, ()=>{
    console.log("Server is running on port 3000!");
});

