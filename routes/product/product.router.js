const {Router}=require('express');
const { getAllproduct, addProduct, editProduct, removeProduct, getoneProduct } = require('../../controller/product/product.controller');
const { verifyToken } = require('../../middleware/verifyAccessToken');
const isAdmin = require('../../middleware/isAdmin');
const { uploadFile } = require('../../utils/multer');
const { string2arr } = require('../../middleware/string2array');
const { addProductToBasket, removeProductoBasket } = require('../../controller/basket/userBasket');
const { like } = require('../../controller/like&deslike/like');
const { deslike } = require('../../controller/like&deslike/deslike');

const productRouter=Router()

productRouter.get('/get-all-product',getAllproduct)
productRouter.post('/add-product',verifyToken,isAdmin,uploadFile.array('images',10),string2arr('colors'),addProduct)
productRouter.patch('/add-product-to-basket',verifyToken,addProductToBasket)
productRouter.patch('/like',verifyToken,like)
productRouter.patch('/deslike',verifyToken,deslike)
productRouter.delete('/remove-product-to-basket',verifyToken,removeProductoBasket)
productRouter.patch('/edit-product/:id',verifyToken,isAdmin,uploadFile.array('images',10),string2arr('colors'),editProduct)
productRouter.delete('/remove-product/:id',verifyToken,isAdmin,removeProduct)
productRouter.get('/get-product-by-id/:id',verifyToken,isAdmin,getoneProduct)


module.exports={
productRouter
}