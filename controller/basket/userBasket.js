const createHttpError = require("http-errors")
const { ProductsModel } = require("../../model/product/productModel")
const { UserModel } = require("../../model/user/userModel")
const { copyObjet } = require("../../utils/func")
const { basketValidator } = require("../../validatator/public.validator/public.validator")


async function findProductInBasket(userID, productID) {

    const findedProduct = await UserModel.findOne({ _id: userID, "basket.products.productID": productID }, {
        "basket.products.$": 1}
    )

    const product = copyObjet(findedProduct)
    return product?.basket?.products?.[0]

}

async function addProductToBasket(req, res, next) {
    try {
        const data = await basketValidator.validateAsync(req.body)
        const user = req.user[0]
        const { productID } = data
        await checkExist(ProductsModel, productID)
        const product = await findProductInBasket(user._id, productID);

        if (!product) {
            await UserModel.updateOne({
                _id: user._id,
            }, {
                $push: {
                    "basket.products": {
                        productID,
                        count: 1
                    }
                }
            })
            return res.status(200).json({
                statusCode: 200,
                data: {
                    message: 'محصول به سبد خرید افزوده شد'
                }
            })

        } else {
            await UserModel.updateOne({
                _id: user._id,
                "basket.products.productID": productID

            }, {
                $inc: {
                    "basket.products.$.count": 1
                }
            })
            return res.status(200).json({
                statusCode: 200,
                data: {
                    message: 'به تعداد سبد خرید اضافه شد'
                }
            })
        }



    } catch (error) {

        next(error)
    }
}
async function removeProductoBasket(req, res, next) {
    try {
        const user = req.user[0]
        const data = await basketValidator.validateAsync(req.body);
        const { productID } = data
        await checkExist(ProductsModel, productID)
        const product = await findProductInBasket(user._id, productID);
        console.log(product);
        if (!product) throw createHttpError.BadRequest('محصولی در سبد خرید وجود ندارد');

        if (product.count > 1) {
            await UserModel.updateOne({
                _id: user._id,
                "basket.products.productID": productID

            }, {
                $inc: {
                    "basket.products.$.count": -1
                }


            })
            message = 'یک واحد از سبد خرید کم شد'
        } else {
            await UserModel.updateOne({
                _id: user._id,
                "basket.products.productID": productID
            }, {
                $pull: {
                    "basket.products": {
                        productID

                    }
                }


            }

            )
            message = 'محصول در داخل سبد خرید حذف شد'

        }
        return res.status(200).json( {
            statusCode: 200,
            data: {
                message
            }
        })


    } catch (error) {
        next(error)
    }
}





async function checkExist(model, id) {
    const foo = await model.findById(id)
    console.log(foo);
    if (!foo) throw createHttpError.NotFound('با این مشخصات محصولی یافت نشد')
    return foo
}
module.exports = {
    addProductToBasket,
    removeProductoBasket,
    checkExist
}