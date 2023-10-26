const createHttpError = require("http-errors");
const { UserModel } = require("../../model/user/userModel");
const { hashPassword } = require("../../utils/func");
const { registerValidator, loginSchema } = require("../../validatator/auth/auth.validation");
const bcrypt = require('bcrypt');
const { tokenGenerator } = require("../../utils/jwt");

async function register(req, res, next) {
    try {
        const data = await registerValidator.validateAsync(req.body)
        console.log(data);
        const { first_name, last_name, username, email, password, mobile } = data;
        const hashPass = hashPassword(password);
        const checkExist = await UserModel.findOne({ $or: [{ username }, { mobile }, { email }] })
        if (checkExist?.username === username) throw createHttpError.BadRequest('نام کاربری در سامانه وجود دارد')
        if (checkExist?.mobile === mobile) throw createHttpError.BadRequest('شماره تماس در سامانه وجود دارد')
        if (checkExist?.email === email) throw createHttpError.BadRequest('ایمیل در سامانه وجود دارد')
        const count = await UserModel.count();
        const role = count > 1 ? 'USER' : "ADMIN";
        const user = await UserModel.create({
            first_name, last_name, username, password: hashPass, email, mobile, role
        }).catch((err) => {
            console.log(err);
            throw createHttpError.BadRequest('نام کاربری در سامانه موجود میباشد')
        })
        return res.status(200).json({
            status: 201,
            data: {
                message: 'ثبت نام با موفقیت انجام شد'
            }
        })

    } catch (error) {
        next(error)
    }
}
async function login(req, res, next) {
    try {
        await loginSchema.validateAsync(req.body)
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user) throw createHttpError.BadRequest('نام کاربری یا رمز عبور اشتباه است')
        const compareResult = bcrypt.compareSync(password, user.password)
        if (!compareResult) throw createHttpError.BadRequest('نام کاربری یا رمز عبور اشتباه است')
        const token = tokenGenerator({ username })
        user.token = token;
        await user.save()
        req.token = token;
        return res.status(200).json({
            status: 200,
            data: {
                message: 'شما با موفقیت لاگین شدید',
                token
            }
        })


    } catch (error) {
        next(error)
    }

}


module.exports = {
    register,
    login
}