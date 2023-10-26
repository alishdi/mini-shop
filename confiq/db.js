const { mongoose } = require('mongoose');
const DB_URI = 'mongodb://127.0.0.1:27017/shop'
mongoose.connect(DB_URI).then(() => {
    console.log('server connected to databse');
},
    (err) => { console.log(err.message) })
    
mongoose.connection.on('connected', () => {
    console.log('mongoos connected to DB');
});
mongoose.connection.on('disconnected', () => {
    console.log('mongoos disconnected to DB');
});
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0)
})