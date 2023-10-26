const Joi = require('joi');
const { mongoIdPattern } = require('../../utils/constant');
const createHttpError = require('http-errors');



const objectIDValidator = Joi.object({
    id: Joi.string().pattern(mongoIdPattern).error(new Error(createHttpError.BadRequest('شناسه وارد شده صحیح نمیباشد')))
})

module.exports={
    objectIDValidator
}