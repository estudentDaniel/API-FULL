const mongoose = require ('mongoose');
const {validationResult, matchedData} = require ('express-validator');
const bcrypt = require('bcrypt');
const State = require("../model/state");
const User = require("../model/user");
module.exports = {
    signin: async(req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()){
            res.json({
                error: erros.mapped()
            });
            return;
        }
        const data = matchedData(req);

        //validar no banco email correspondente
        const user = await User.findOne({ email: data.email})//findOne => encrontre um
        
        if (!user){
            res.json({error: "Email e/ou senha incorreta"});
            return;
        }
        //validar senha correspondente
        const match = await bcrypt.compare(data.password, user.passwordHash);

        if(!match){
            res.json({error: "Email e/ou senha incorreta"});
            return;
        }
        const padraoToken = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(padraoToken, 10);
        user.token = token;
        await user.save();
        res.json({ token, email: data.email});

    },
    signup: async(req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()){
            res.json({
                error: erros.mapped()
            });
            return;
        }
        const data = matchedData(req);
        console.log('data', data)

        //busca email no banco
        const user = await User.findOne({ email: data.email})//findOne => encrontre um
        
        if (user){
            res.json({error: "Email ja é esxistente"});
            return;
        }
        console.log(data.state)
        if(mongoose.Types.ObjectId.isValid(data.state)){
            const stateCheck = await State.findById(data.state);
            if(!stateCheck){
                res.json({error: 'Estado não existe'});
                return;
            }
          //  updates.states = data.state;
        }else{
            res.status(400).json({error: 'codigo do estado em formato invalido'});
            return;
        }
        const passwordHash = await bcrypt.hash(data.password, 10);
        const padraoToken = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(padraoToken, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
        });
        await newUser.save();
        res.json({token});
    }
    
}
