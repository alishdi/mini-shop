function notFoundError(req, res, next){
    res.send({
        statusCode: 404,
        message: "NotFound page"
    })
}
function errorHandler(err, req, res, next) {
    console.log(err);
    const status = err?.status ?? err?.statusCode?? 500
    res.send({
        statusCode: status,
        message: err?.message ?? "internalServerError"
    })
}
module.exports={
    notFoundError,
    errorHandler
}