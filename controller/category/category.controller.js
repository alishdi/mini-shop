const createHttpError = require("http-errors");
const { CategoryModel } = require("../../model/category/categoryModel");
const { categorySchema } = require("../../validatator/category.validator")

async function addCategory(req, res, next) {
    try {
        await categorySchema.validateAsync(req.body);
        const { title, parent } = req.body

        const category = await CategoryModel.create({ title, parent })
        if (!category) throw createHttpError.InternalServerError('خطای سروری')
        return res.status(201).json({
            status: 201,
            data: {
                message: 'دسته بندی با موفقیت ایجاد شد'
            }
        })

    } catch (error) {
        next(error)
    }
}
async function getAllCategory(req, res, next) {
    try {

        const categories = await CategoryModel.aggregate([
            {
                $graphLookup: {
                    from: 'categories',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'parent',
                    maxDepth: 5,
                    depthField: 'depth',
                    as: 'children'
                }
            }, {
                $project: {
                    __v: 0,
                    "children.__v": 0,

                }
            },
            {
                $match: {
                    parent: undefined
                }
            }
        ])
        // const categories = await CategoryModel.find({ parent: undefined }, { __v: 0 })

        return res.status(200).json({
            status:200,
            data: {
                categories
            }
        })

    } catch (error) {
        next(error)
    }

}
async function checkExistCategory(id) {
    const category = await CategoryModel.findById(id)
    if (!category) throw createError.NotFound('دسته بندی یافت نشد')
    return category
}
async function removeCategory(req,res,next){
    try {
        const { id } = req.params
        const category = await checkExistCategory(id)
        const delteResult = await CategoryModel.deleteMany({
            $or: [
                { _id: category._id },
                { parent: category._id }
            ]
        })
        if (delteResult.deletedCount == 0) createError.InternalServerError('حذف دسته بندی انجام نشد')
        return res.status(202).json({
    status: 200,
            data: {
                message: 'حذف دسته بندی با موفقیت انجام شد',
            }
        })

    } catch (error) {
        next(error)
    }
}
async function editCategory(req,res,next){
    try {
        const { id } = req.params
        await categorySchema.validateAsync(req.body)
        const {title}=req.body;
        const category = await checkExistCategory(id)
        const categories=await CategoryModel.updateOne({_id:category._id},{
            $set:{
                title
            }
        })
        if(!categories.modifiedCount) throw createHttpError.InternalServerError('خطای سرور');
        return res.status(200).json({
            status:200,
            data:{
                message:'به روزرسانی با موقیت انجام شد'
            }
        })


        
    } catch (error) {
        next(error)
    }
}


module.exports={
    addCategory,
    getAllCategory,
    removeCategory,
    editCategory
}