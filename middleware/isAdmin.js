const createHttpError = require("http-errors")

function isAdmin(req, res, next) {
    console.log(req.user);
    if (req.user[0].role === 'ADMIN' || req.user[0].role==='AUTHOR') {
        next()
    }
    else{

        throw createHttpError.BadRequest('شما به این مسیر دسترسی ندارید')
    }
}

module.exports = isAdmin