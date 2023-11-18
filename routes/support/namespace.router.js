const { Router } = require('express');
const { createNameSpace, getListOfNameSpaces } = require('../../controller/support/support.controller');
const namespaceRouter = Router();
namespaceRouter.post('/add', createNameSpace)
namespaceRouter.get('/list', getListOfNameSpaces)

module.exports = {
    namespaceRouter
}