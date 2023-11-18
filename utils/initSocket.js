const socketio = require('socket.io');

function initialSocket(app) {
    const io = socketio(app, {
        cors: {
            origin: '*'
        }
    })
    return io
}
module.exports = {
    initialSocket
}