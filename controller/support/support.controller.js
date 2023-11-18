const createHttpError = require("http-errors");
const { ConverSationModel } = require("../../model/conversation/conversation");
const { signAccessToken } = require("../../utils/func");
const { UserModel } = require("../../model/user/userModel");

async function renderChatRoom(req, res, next) {
    try {
        return res.render('chat.ejs')

    } catch (error) {
        next(error)
    }
}
async function loginform(req, res, next) {
    try {
        return res.render('login.ejs', {
            error: undefined
        })

    } catch (error) {
        next(error)
    }
}
async function login(req, res, next) {
    try {
        const { mobile } = req.body
        const user = await UserModel.findOne({ mobile })
        if (!user) {
            return res.render('login.ejs', {
                error: 'نام کاربری صحیح نمیباشد'
            })
        }
        const token = await signAccessToken(user._id)
        user.token = token
        user.save();
        res.cookie('authorization', token, { signed: true, httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 1) })
        return res.redirect('/support')


    } catch (error) {
        next(error)
    }
}

//create nameSpace
async function createNameSpace(req, res, next) {
    try {
        const { title, endpoint } = req.body;
        await findNameSpaceWithEndpoint(endpoint)
        const conversation = await ConverSationModel.create({ title, endpoint })
        return res.status(201).json({
            status: 201,
            data: {
                message: "فضای چت با موفقیت ایجاد شد"
            }
        })

    } catch (error) {
        next(error)
    }
}
async function getListOfNameSpaces(req, res, next) {
    try {

        const namespaces = await ConverSationModel.find({}, { rooms: 0 });
        return res.status(201).json({
            status: 201,
            data: {
                namespaces
            }
        })

    } catch (error) {
        next(error)
    }
}
async function findNameSpaceWithEndpoint(endpoint) {
    try {
        const conversation = await ConverSationModel.findOne({ endpoint });
        if (conversation) throw createHttpError.BadRequest('این اسم قبلا انتخاب شده است')
        return conversation
    } catch (error) {
        next(error)
    }
}
async function findNameSpace(endpoint) {
    try {
        const conversation = await ConverSationModel.findOne({ endpoint });
        if (!conversation) throw createHttpError.NotFound('همچین گروهی پیدا نشد')
        return conversation

    } catch (error) {
        next(error)
    }
}

//createRoom

async function createRoom(req, res, next) {
    try {
        const { name, description, filename, fileuploadpath, namespace } = req.body;
        await findNameSpace(namespace)
        await findRoomWithEndpoint(name)
        const image = `${fileuploadpath}/${filename}`;
        const room = { name, description, image }
        const conversation = await ConverSationModel.updateOne({ endpoint: namespace }, {
            $push: {
                rooms: room
            }
        })
        return res.status(201).json({
            status: 201,
            data: {
                message: "فضای چت با موفقیت ایجاد شد"
            }
        })

    } catch (error) {
        next(error)
    }
}
async function getListOfRooms(req, res, next) {
    try {

        const rooms = await ConverSationModel.find({}, { rooms: 1 });
        return res.status(201).json({
            status: 201,
            data: {
                rooms: rooms.rooms
            }
        })

    } catch (error) {
        next(error)
    }
}
async function findRoomWithEndpoint(name) {
    try {
        const conversation = await ConverSationModel.findOne({ 'rooms.name': name });
        if (conversation) throw createHttpError.BadRequest('این اسم قبلا انتخاب شده است')
        return conversation
    } catch (error) {
        next(error)
    }
}


module.exports = {
    renderChatRoom,
    createNameSpace,
    getListOfNameSpaces,
    createRoom,
    getListOfRooms,
    loginform,
    login
}