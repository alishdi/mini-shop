const createHttpError = require("http-errors")
const { ProductsModel } = require("../../model/product/productModel")
const { copyObjet } = require("../../utils/func")
const { default: mongoose } = require("mongoose")

async function addCommentForProduct(req, res, next) {
    try {

        const user = req.user[0]._id
        const { comments, parent } = req.body
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest('شناسه ارسال شده صحیح نیست')
        const product = await ProductsModel.findById(id)
        if (!product) throw createHttpError.BadRequest('محصولی برای ثبت کامنت یافت نشد')

        let commentDocument;

        if (parent && mongoose.isValidObjectId(parent)) {
            commentDocument = await getComment(ProductsModel, parent)

            if (commentDocument && !commentDocument?.isReplly) throw createHttpError.BadRequest('ثبت پاسخ مجاز نیست')
            const createAnswerResult = await ProductsModel.updateOne(
                { _id: id, 'comments._id': parent }, {
                $push: {
                    'comments.$.answers': { comments: comments, user: user, show: false, isReplly: false }
                },
                $set: {
                    'comments.$.isReplly': false
                }
            })


            if (!createAnswerResult.modifiedCount) throw createHttpError.InternalServerError('ثبت پاسخ انجام نشد')

            return res.status(201).json({
                statusCode: 201,
                data: {
                    message: 'پاسخ شما با موفقیت ثبت شد'
                }
            })

        }
        else {
            const applyCm = await ProductsModel.updateOne({ _id: product._id }, {
                $push: {
                    comments: {
                        comments,
                        user,
                        isReplly: true
                    }
                }
            })
        }

        return res.status(201).json({
            status: 201,
            data: {
                message: 'کامنت با موفقیت ثبت شد و پس از تایید در وبسایت نمایش داده میشود'
            }
        })

        console.log(product);
    } catch (error) {
        next(error)
    }

}

async function getComment(model, id) {
    const findedcomment = await model.findOne({ 'comments._id': id }, { 'comments.$': 1 })
    const comment = copyObjet(findedcomment)
    if (!comment) throw createHttpError.NotFound('نظری با این ایدی یافت نشد')
    return comment?.comments?.[0]
}

module.exports = {
    addCommentForProduct
}