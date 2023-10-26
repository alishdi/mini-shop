const createHttpError = require("http-errors")
const { ProductsModel } = require("../../model/product/productModel")
const { createProductsschema } = require("../../validatator/product/productSchema")
const { setFeature, listOfImageFromRequest, deleteFieldInPublic, copyObjet } = require("../../utils/func")
const { objectIDValidator } = require("../../validatator/public.validator/public.validator")


async function getAllproduct(req, res, next) {
    try {
        const product = await ProductsModel.find({})
        if (!product) throw createHttpError.BadRequest('محصولی وجود ندارد')
        return res.status(200).json({
            status: 200,
            data: {
                product
            }
        })

    } catch (error) {
        next(error)
    }
}
async function addProduct(req, res, next) {
    try {
        
        const images = listOfImageFromRequest(req?.files || [], req.body.fileuploadpath)
        const productBody = await createProductsschema.validateAsync(req.body);
        const { title, text, short_text, category, price, count, discount } = productBody;
        const supplier = req.user[0]._id
      
        let feature = setFeature(req.body);
        let type;
        if (feature.height || feature.length || feature.weight || feature.width) {
            type = 'physical'

        } else {
            type = 'virtual'
        }


        const product = await ProductsModel.create({ title, text, short_text, category, count, price, discount, images, feature, supplier, type })
        if(!product) throw createHttpError.BadRequest('خطای سرور')
        
        return res.json({
            status: 201,
            data: {
                message: 'افزودن محصول با موفقیت انجام شد'
            }
        })
        
        
        
    } catch (error) {
        deleteFieldInPublic(`${req.body.fileuploadpath}/${req.body.filename}`)
        next(error)
    }
}
async function editProduct(req,res,nsxt){
    try {
        const { id } = req.params
        const product = await getProductById(id)
        const data = copyObjet(req.body)
        console.log(data);
        data.images = listOfImageFromRequest(req.files || [], req.body.fileuploadpath)
        let feature = setFeature(req.body)
        data.feature = feature

        if (feature.height || feature.length || feature.weight || feature.width) {
            data.type = 'physical'

        } else {
            data.type = 'virtual'
        }



        let nullishData = ["", " ", "0", null, undefined]
        let blackListFields = ['bookmark', 'deslike', 'like', 'comments', 'supplier', 'width', 'length', 'height', 'weight', 'colors']
        Object.keys(data).forEach(key => {
            if (blackListFields.includes(key)) delete data[key]
            if (typeof data[key] == 'string') data[key] = data[key].trim();
            if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
            if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
            if (nullishData.includes(data[key])) delete data[key]

        })
        const updateResult = await ProductsModel.updateOne({ _id: product.id }, { $set: data })
        if (updateResult.modifiedCount == 0) throw { status: createHttpError.InternalServerError('server err') }

        return res.status(200).json({
            status: 200,
            data: {
                message: 'با موفقیت به روز رسانی شد',

            }
        })


    } catch (error) {
        next(error)
    }
}
async function removeProduct(req,res,next){
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        const removeProductResult = await ProductsModel.deleteOne({ _id: product._id })
        if (removeProductResult.deletedCount == 0) throw createHttpError.InternalServerError('خطای سروری')


        return res.status(200).json({
            status: 200,
            data: {
                message: 'با موفقیت حذف شد'
            }
        })


    } catch (error) {
        next(error)
    }
}
async function getProductById(productID) {
    const { id } = await objectIDValidator.validateAsync({ id: productID })
    const product = await ProductsModel.findById(id)
    if (!product) throw createHttpError.NotFound('محصول یافت نشد')
    return product
}

module.exports = {
    getAllproduct,
    addProduct,
    editProduct,
    removeProduct
}