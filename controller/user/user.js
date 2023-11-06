const createHttpError = require("http-errors")
const { UserModel } = require("../../model/user/userModel")
const path = require('path');
const { userSchema } = require("../../validatator/user.validator");

async function getAllUser(req, res, next) {
    try {
        let { search } = req.query;

        let users;
        if (search) {
            users = await UserModel.find({ $text: { $search: search } })

        } else {
            users = await UserModel.find({}, { otp: 0, __v: 0,password:0,token:0 }).populate([{path:'basket.products.productID'}])
        }
        return res.status(200).json({
            status: 200,
            data: {
                users
            }
        })
    } catch (error) {
        next(error)
    }
}
async function getUserByID(req, res, next) {
    try {
        const userID = req.params.id;
        const user = await UserModel.findById(userID, { otp: 0, __v: 0,password:0 })
        if (!user) throw createHttpError.BadRequest('NotFound User')
        return res.json({
            status: 200,
            data: {
                user
            }
        })

    } catch (error) {
        next(error)
    }
}
async function updateProfile(req, res, next) {
    try {

        const userID = req.user[0]._id;
        await userSchema.validateAsync(req.body)
        const data = req.body;
        const profile = path.join(`${req.body.fileuploadpath}/${req.file.filename}`)
        let nullishData = ["", " ", "0", null, undefined]
        let blackListFields = ['products', 'basket', 'mobile', 'otp', 'bills', '_id', 'rolles', 'discount']
        Object.keys(data).forEach(key => {
            if (blackListFields.includes(key)) delete data[key]
            if (typeof data[key] == 'string') data[key] = data[key].trim();
            if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
            if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
            if (nullishData.includes(data[key])) delete data[key]
        })
        console.log(req.user);
        const updateResult = await UserModel.updateOne({ _id: userID }, {
            $set: {
                ...data,
                profile
            }
        })
        console.log(updateResult);
        if (!updateResult.modifiedCount) throw createHttpError.InternalServerError('خطای سرور')
        return res.status(200).json({
            status: 200,
            data: {
                message: 'با موفقیت به روزرسانی شد'
            }
        })


    } catch (error) {
        next(error)
    }
}
async function getUserProfile(req, res, next) {
    try {
        const user = req.user
        return res.json({
            status: 200,
            data: {
                user
            }
        })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllUser,
    getUserByID,
    getUserProfile,
    updateProfile
}