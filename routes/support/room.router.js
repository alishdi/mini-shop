const { Router } = require('express');
const { createRoom, getListOfRooms } = require('../../controller/support/support.controller');
const { uploadFile } = require('../../utils/multer');
const roomRouter = Router();
roomRouter.post('/add',uploadFile.single('image'),createRoom);
roomRouter.get('/list', getListOfRooms)

module.exports = {
    roomRouter
}