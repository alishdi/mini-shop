const { ProductsModel } = require("../../model/product/productModel");
const { bookmarkValidator } = require("../../validatator/public.validator/public.validator");
const { checkExist } = require("../basket/userBasket");

async function deslike(req, res, next) {
    try {
        const data = bookmarkValidator.validateAsync(req.body);
        const { productID } = req.body;
        const user = req.user[0]._id
        await checkExist(ProductsModel, productID)
        let likedproduct = await ProductsModel.findOne({
            _id: productID,
            like: user
        })
        let deslikedproduct = await ProductsModel.findOne({
            _id: productID,
            deslike: user
        })

        const updateQuery = deslikedproduct ? { $pull: { deslike: user } } : { $push: { deslike: user} }

        await ProductsModel.updateOne({ _id: productID }, updateQuery)
        let message;
        if (deslikedproduct && !likedproduct) {
            await ProductsModel.updateOne({ _id: productID }, { $pull: { deslike: user } })
            message = 'نپسندیدن لغو شد'
        } else message = 'نپسندیدن  با موفقیت انجام شد'




        return res.status(200).json({
            statusCode: 201,
            data: {
                message
            }
        })




    } catch (error) {
        next(error)
    }
}
    

    module.exports={
        deslike
    }