const Joi = require('joi');
const userSchema = Joi.object({
    first_name: Joi.string().required().error(new Error('نام اجباری است')),
    last_name: Joi.string().required().error(new Error('نام خانوادگی اجباری است')),
    username:Joi.string().min(6).max(11).required().error(new Error('یوزر باید یونیک باشد')),
    email:Joi.string().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).error(new Error('ایمیل اشتباه است')),
    fileuploadpath:Joi.allow(),
    filename:Joi.allow()
})
module.exports={
    userSchema
}