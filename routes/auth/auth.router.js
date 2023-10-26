const { Router } = require('express');
const { getOtp, checkOtp } = require('../../controller/auth.js/auth');
const { register, login } = require('../../controller/auth.jwt.js/autth-jwt');

const authRouter = Router()




authRouter.post('/get-otp', getOtp)



authRouter.post('/check-otp', checkOtp)
authRouter.post('/register', register)
authRouter.post('/login', login)

module.exports = {
    authRouter
}