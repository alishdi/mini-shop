const JWT = require('jsonwebtoken');
const { UserModel } = require('../model/user/userModel');
const { SECRET_KEY_ACCESS_TOKEN } = require('./constant');
const createHttpError = require('http-errors');
const bcrypt=require('bcrypt');

function randomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}

function signAccessToken(userID) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userID)

        const payload = {
            mobile: user.mobile,

        };

        const option = {
            expiresIn: '1h'
        };
        JWT.sign(payload, SECRET_KEY_ACCESS_TOKEN, option, (err, token) => {
            if (err) createHttpError.InternalServerError('sever err')
            resolve(token)
        })
    })
}
function hashPassword(password){
    const salt=bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
}
function setFeature(body) {
    const { colors, width, weight, height, length } = body
    let feature = {}
    feature.colors = colors
    if (!isNaN(width) || !isNaN(height) || !isNaN(weight) || !isNaN(length)) {
        if (!width) feature.width = 0
        else feature.width = width
        if (!height) feature.height = 0
        else feature.height = height
        if (!length) feature.length = 0
        else feature.length = length
        if (!weight) feature.weight = 0
        else feature.weight = weight

    }

    return feature
}
function listOfImageFromRequest(files, fileuploadpath) {
    const path=require('path');
    if (files?.length > 0) {
        return files.map(file => path.join((fileuploadpath.replace(/\\/g, '/')), file.filename))
    } else {
        return []
    }
}
function deleteFieldInPublic(fileAddres) {
    
    const path=require('path');
    const fs=require('fs');
    if (fileAddres) {
        const pathfile = path.join(__dirname, "..",'public', fileAddres)
        
        if (fs.existsSync(pathfile)) fs.unlinkSync(pathfile)
        
    }
}
function copyObjet(object) {
    return JSON.parse(JSON.stringify(object))
}






module.exports = {
    randomNumberGenerator,
    signAccessToken,
    hashPassword,
    setFeature,
    listOfImageFromRequest,
    deleteFieldInPublic   ,
    copyObjet
}