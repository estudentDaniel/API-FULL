const express = require ('express');
const router = express.Router();

const usercontroller = require('./controller/usercontroller');
const AuthController = require('./controller/authController');
const validator =  require('./validator/uservalidator');
const Auth = require('./middleware/middleware');
//rota para estados --> publica

router.get('/states', Auth.private, usercontroller.getStates);
router.get('/users', usercontroller.getUsers);

//Processo de criar usuario
//TODO --> implementar midleware para rotas privadas...
router.put('/user/me', usercontroller.editAction);
//router.get('/user/me', usercontroller.info);
//router.post('/user/me', usercontroller.insertAction);

//processo de login
router.post('/user/signin', validator.editAction, AuthController.signin);
router.post('/user/signup', validator.editAction, AuthController.signup);



module.exports = router;
