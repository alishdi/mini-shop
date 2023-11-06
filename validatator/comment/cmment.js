const Joi=require('joi');
const { mongoIdPattern } = require('../../utils/constant');


const commentValidation=Joi.object({
    user:Joi.string().pattern(mongoIdPattern).required().error(new Error('باید مونگو آیدی باشد')),
    comments:Joi.string().required().error(new Error('هیچ کامنتی ثبت نشد'))
})

module.exports={
    commentValidation
}