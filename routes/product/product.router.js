const {Router}=require('express');
const { getAllproduct, addProduct, editProduct, removeProduct } = require('../../controller/product/product.controller');
const { verifyToken } = require('../../middleware/verifyAccessToken');
const isAdmin = require('../../middleware/isAdmin');
const { uploadFile } = require('../../utils/multer');
const { string2arr } = require('../../middleware/string2array');

const productRouter=Router()

productRouter.get('/get-all-product',getAllproduct)
productRouter.post('/add-product',verifyToken,isAdmin,uploadFile.array('images',10),string2arr('colors'),addProduct)
productRouter.patch('/edit-product/:id',verifyToken,isAdmin,uploadFile.array('images',10),string2arr('colors'),editProduct)
productRouter.delete('/remove-product/:id',verifyToken,isAdmin,removeProduct)


module.exports={
productRouter
}