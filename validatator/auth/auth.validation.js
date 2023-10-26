const Joi = require('joi');

const authSchema = Joi.object({
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error('شماره موبایل وارد شده صحیح نمیباشد')),

})
const checkOtpSchema = Joi.object({
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error('شماره موبایل وارد شده صحیح نمیباشد')),
    code: Joi.string().min(4).max(6).error(new Error('کد ارسال شده صحیح نمیباشد'))


})
const registerValidator = Joi.object({
    first_name: Joi.string().lowercase().required().error(new Error('نام اجباری است')),
    last_name: Joi.string().lowercase().required().error(new Error('نام خانوادگی اجباری است')),
    username: Joi.string().min(4).max(10).lowercase().required().error(new Error('یوزرنیم باید بین 4 تا 10 کاراکتر باشد')),
    email: Joi.string().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).lowercase().required().error(new Error('ایمیل صحیح نیست')),
    password: Joi.string().min(6).max(12).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/).required().error(new Error('پسورد باید شامل حروف کوچک بزرگ و کاراکتر های خاص و اعداد باشد و بین 8 تا 10 کاراکتر باشد')),
    confirm_password: Joi.ref('password'),
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error('شماره موبایل وارد شده صحیح نمیباشد')),
    

})
const loginSchema=Joi.object({
    username:Joi.string().min(4).max(10).lowercase().required().error(new Error('یوزرنیم باید بین 4 تا 10 کاراکتر باشد')),
    password: Joi.string().min(6).max(12).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/).required().error(new Error('پسورد باید شامل حروف کوچک بزرگ و کاراکتر های خاص و اعداد باشد و بین 8 تا 10 کاراکتر باشد')),
    confirm_password: Joi.ref('password'),
})

module.exports = {
    authSchema,
    checkOtpSchema,
    registerValidator,
    loginSchema
}