const createHttpError = require("http-errors");
const { SECRET_KEY_ACCESS_TOKEN } = require("../utils/constant");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../model/user/userModel");

function verifyToken(req, res, next) {
    const headers = req.headers;

    const [bearer, token] = headers?.authorization?.split(' ') || []


    if (token && ['Bearer', 'bearer'].includes(bearer)) {
        JWT.verify(token, SECRET_KEY_ACCESS_TOKEN, async (err, decoded) => {

            if (err) return next(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'))
            const { mobile, username } = decoded || {}
            const user = await UserModel.aggregate([
                {
                    $match: {
                        $or: [
                            {  mobile },
                            { username }
                        ]
                    }
                },{
                    $project:{
                        'password':0,
                        'otp':0,
                        'token':0
                    }
                },
            ])




            
            if (!user) return next(createHttpError.Unauthorized('حساب کاربری یافت نشد'))
            req.user = user
        
            return next()
        })

    }
    else return next(createHttpError.Unauthorized('مجددا وارد حساب خود شوید'))
}

module.exports = {
    verifyToken
}