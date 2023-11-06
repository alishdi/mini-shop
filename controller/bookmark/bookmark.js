const { ProductsModel } = require("../../model/product/productModel");
const { UserModel } = require("../../model/user/userModel");
const { bookmarkValidator } = require("../../validatator/public.validator/public.validator");
const { checkExist } = require("../basket/userBasket");

async function addBookmark(req, res, next) {
    try {
        const data = await bookmarkValidator.validateAsync(req.body)

        const { productID } = req.body;
        const user = req.user[0]._id
        await checkExist(ProductsModel, productID)
        let bookmark = await UserModel.findOne({
            _id: user,
            bookmark: productID

        })
        console.log(bookmark);
        const updateQuery = bookmark ? { $pull: { bookmark: productID } } : { $push: { bookmark: productID } }

        

        await UserModel.updateOne({ _id: user }, updateQuery)
        let message;
        if (bookmark) {
            await UserModel.updateOne({ _id: user }, { $pull: { bookmark: productID } })
            message = 'ذخیره لغو شد'
        } else message = 'ذخیره  با موفقیت انجام شد'

        return res.status(200).json( {
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
    addBookmark
}