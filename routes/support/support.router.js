const { Router } = require('express');
const { renderChatRoom, loginform, login } = require('../../controller/support/support.controller');
const { namespaceRouter } = require('./namespace.router');
const { roomRouter } = require('./room.router');
const { checkLogin, checkAccessLogin } = require('../../middleware/auth');
const supportRouter = Router()

supportRouter.get('/',checkLogin,renderChatRoom)
supportRouter.use('/namespace',namespaceRouter)
supportRouter.get('/login',checkAccessLogin,loginform)
supportRouter.post('/login',checkAccessLogin,login)
supportRouter.use('/room',roomRouter)



module.exports={
    supportRouter
}