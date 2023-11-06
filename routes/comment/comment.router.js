const { Router } = require('express');
const { verifyToken } = require('../../middleware/verifyAccessToken');
const { addCommentForProduct } = require('../../controller/comment/comment');

const commentRouter = Router()

commentRouter.patch('/add-comment/:id',verifyToken,addCommentForProduct)
module.exports={
    commentRouter
}