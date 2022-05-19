//referenciar model user--> criar modulo, se existe token (query body)
//verificar se o token esta vazio, token eh valido ou invalido
const user = require('../model/user');//referenciar

module.exports = {
    private: async(req, res, next) => {
        if (!req.query.token && !req.body.token){
            res.json({ logado: false  })
            return;
        }
        if (req.query.token) {
            token = req.query.token;
        }
        if(req.body.token) {
            token = req.body.token;
        }
        if(!token) {
            res.json({ logado: false  })
            return;
        }

        const user = await User.findOne({ token })//findOne => encrontre um

        if(!user){
            res.json({ logado: false });
            return;
        }

        next();

    }
}