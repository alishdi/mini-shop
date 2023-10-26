const createHttpError = require('http-errors');
const Joi = require('joi');
const { mongoIdPattern } = require('../../utils/constant');


const createProductsschema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان دسته بندی صحیح نمیباشد')),
    text: Joi.string().error(createHttpError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    short_text: Joi.string().error(createHttpError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp|\.gif)$/).error(createHttpError.BadRequest('عکس صحیح نمیباشد')),
    fileuploadpath: Joi.allow(),
    category: Joi.string().regex(mongoIdPattern).error(createHttpError.BadRequest('دسته بندی مورد نظر یافت نشد')),
    price: Joi.number().error(createHttpError.BadRequest('قیمت وترد شده صحیح نمیباشد')),
    type: Joi.string().regex(/(virtual|physical)/i),
    colors: Joi.array().min(0).max(20).error(createHttpError.BadRequest("رنگ های انتخابی  نمیتواند بیشتر از 20 ایتم باشد")),
    count: Joi.number().error(createHttpError.BadRequest('تعداد باید عدد باشد')),
    discount: Joi.number().error(createHttpError.BadRequest('تخفیف باید عدد باشد')),
    weight: Joi.number().allow(null, 0, '0').error(createHttpError.BadRequest('وزن عدد باشد')),
    length: Joi.number().allow(null, 0, '0').error(createHttpError.BadRequest('تعداد عدد باشد')),
    height: Joi.number().allow(null, 0, '0').error(createHttpError.BadRequest('ارتفاع عدد باشد')),
    width: Joi.number().allow(null, 0, '0').error(createHttpError.BadRequest('اندازه عدد باشد')),
    supplier: Joi.string().allow('')
})

module.exports = {
    createProductsschema
}

