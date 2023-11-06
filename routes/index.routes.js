const { Router } = require('express');

const { authRouter } = require('./auth/auth.router');
const { indexRouter } = require('.');
const { userRouter } = require('./user/user');
const { categoryRouter } = require('./category/category.router');
const { productRouter } = require('./product/product.router');
const { commentRouter } = require('./comment/comment.router');
const indexRoutes = Router()
indexRoutes.use('/', indexRouter)

indexRoutes.use('/auth',authRouter)
indexRouter.use('/user',userRouter)
indexRouter.use('/category',categoryRouter)
indexRouter.use('/product',productRouter)
indexRouter.use('/comments',commentRouter)


module.exports = indexRoutes