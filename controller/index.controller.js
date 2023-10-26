

async function indexRoute(req, res, next) {
    try {
        res.send('hello nodejs')
        
    
    } catch (error) {
        next(error)
    }
}


module.exports = {
    indexRoute
}