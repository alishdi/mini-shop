const Joi = require('joi');
const { mongoIdPattern } = require('../utils/constant');

const categorySchema = Joi.object({
    title: Joi.string().min(3).max(30).required().error(new Error('تایتل اجباری است')),
    parent: Joi.string().allow('').pattern(mongoIdPattern).error(new Error('فرمت صحیح نیست'))
})
const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error('عنوان دسته بندی صحیح نمیباشد'))

})

module.exports = {
    categorySchema,
    updateCategorySchema
}