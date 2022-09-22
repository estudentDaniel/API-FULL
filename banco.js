const express = require('express');
const router =  express.Router();
//-------------------------Banco ficticio---------------------------------------
let db = [
    {"1": {Nome: "fulano 1"}},
    {"2": {Nome: "fulano 2"}},
    {"3": {Nome: "fulano 3"}},
];


//Busca
router.get("/app", (req,res)=>{  
  return res.json({msg: db})
});
//Adiciona
router.post("/app", (req, res)=>{
    const user = req.body;
    if(!user){
        return res.status(400).end()
    }
        db.push(user);
        return res.json({msg: "ediatdo"});

});
//
router.put("/:id", (req, res)=>{
    let id = req.params.id;
    let editado = id.Nome;
    return res.status(200).json({msg: "ediatdo", user: editado});
      
});
router.delete("/:id", (req, res)=>{
    const id = req.params.id;

    let banco = db.filter(item =>{
        if (!item[id]) {
            return item;
        }
    })
    db = banco;
    return res.send(banco);
});

module.exports = router;