const { Router } = require('express');
const { addCategory, getAllCategory, removeCategory, editCategory } = require('../../controller/category/category.controller');
const isAdmin = require('../../middleware/isAdmin');
const { verifyToken } = require('../../middleware/verifyAccessToken');

const categoryRouter = Router();

categoryRouter.post('/add-category',verifyToken,isAdmin,addCategory)
categoryRouter.get('/get-all-category',verifyToken,getAllCategory)
categoryRouter.delete('/remove-category/:id',verifyToken,isAdmin,removeCategory)
categoryRouter.patch('/edit-category/:id',verifyToken,isAdmin,editCategory)

module.exports={
    categoryRouter
}