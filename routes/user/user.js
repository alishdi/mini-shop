const { Router } = require('express');
const { getAllUser, getUserByID, getUserProfile, updateProfile } = require('../../controller/user/user');
const { verifyToken } = require('../../middleware/verifyAccessToken');
const isAdmin = require('../../middleware/isAdmin');
const { uploadFile } = require('../../utils/multer');
const { addBookmark } = require('../../controller/bookmark/bookmark');


const userRouter = Router()
userRouter.get('/get-all-user',verifyToken,isAdmin,getAllUser);
userRouter.get('/get-user-profile',verifyToken,getUserProfile);
userRouter.patch('/add-bookmark',verifyToken,addBookmark);
userRouter.put('/update-user-profile',verifyToken,uploadFile.single('profile'),updateProfile);
userRouter.get('/get-user/:id',verifyToken,isAdmin,getUserByID);

module.exports={
    userRouter
}