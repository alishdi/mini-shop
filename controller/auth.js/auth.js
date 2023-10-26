const createHttpError = require("http-errors")
const { UserModel } = require("../../model/user/userModel")
const { randomNumberGenerator, signAccessToken, signRefreshToken } = require("../../utils/func")
const { authSchema, checkOtpSchema } = require("../../validatator/auth/auth.validation")

async function getOtp(req, res, next) {
    try {
  
        const data = await authSchema.validateAsync(req.body)
        const { mobile } = req.body
        const code = randomNumberGenerator()
        const result = await saveUser(mobile, code)
        if (!result) throw createHttpError.BadRequest('ورود شما انجام نشد')
        return res.status(200).send({
            data: {
                statusCode: 200,
                message: 'کد اعتبار سنجی با موفقیت برای شما ارسال شد',
                code,
                mobile
            }
        })
    } catch (error) {
        next(error)
    }
}
async function checkOtp(req, res, next) {
    try {
        
        const data = await checkOtpSchema.validateAsync(req.body)
        const { mobile, code } = req.body
        const user = await UserModel.findOne({ mobile })
        if (!user) throw createHttpError.BadRequest('حساب کاربری یافت نشد')
        if (user.otp.code != code) throw createHttpError.BadRequest('کد ارسال شده صحیح نمیباشد')
        const now = Date.now()
        if (+user.otp.expireIn < now) throw createHttpError.BadRequest('کد شما منقضی شده است')
        const accessToken = await signAccessToken(user._id)

        res.json({
            data: {
                accessToken
            }
        })
    } catch (error) {
        next(error)
    }
}
async function saveUser(mobile, code) {
    let otp = {
        code,
        expireIn: new Date().getTime() + 120000
    }
    const result = await checkExistUser(mobile)
    const countOfUser = await UserModel.count()
    if (result) {
        return (await updateUser(mobile, { otp }))
    }
    return !!(await UserModel.create({
        mobile,
        otp,
        role: countOfUser > 1 ? 'USER' : 'ADMIN'
    }))
}

async function checkExistUser(mobile) {
    const user = await UserModel.findOne({ mobile })
    return !!user
}
async function updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach(key => {
        if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key])) delete objectData[key]

    })
    const updateResult = await UserModel.updateOne({ mobile }, { $set: objectData })
    return !!updateResult.modifiedCount
}


module.exports = {
    getOtp,
    checkOtp
}