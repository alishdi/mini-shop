const jwt = require("jsonwebtoken");
const { SECRET_KEY_ACCESS_TOKEN } = require("./constant");

function tokenGenerator(payload) {
    const token = jwt.sign(payload,SECRET_KEY_ACCESS_TOKEN, { expiresIn: '365 days' })
    return token
}
function tokenVerify(token) {
    const resul = jwt.verify(token,SECRET_KEY_ACCESS_TOKEN)
    if (!resul?.username) throw { status: 401, message: 'لطفا وارد حساب کاربری خود شوید' }
    return resul
}


module.exports = {
    tokenGenerator,
    tokenVerify
}