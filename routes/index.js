const { Router } = require('express');
const { indexRoute } = require('../controller/index.controller');



const indexRouter = Router()
indexRouter.get('/', indexRoute)

module.exports = {
    indexRouter
}