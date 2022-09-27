const Router = require('express').Router;
const multer = require('multer')
const userController = require('../controllers/user-controller');
const filesController = require('../controllers/files-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const path = require("path");
// const upload = multer({ dest: path.resolve(__dirname, 'files') });
const express = require("express");

// const app = express();

// app.use(express.static(__dirname));
// app.use(multer({dest: 'files'}).single('file'));



router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/signin', userController.login);
router.get('/logout', userController.logout);
router.post('/signin/new_token', userController.refresh);

// router.post('/upload', filesController.uploadFile);

// router.get(
//     '/download/:id',
//     validate({ params: validator.getSchema('fileId') }),
//     asyncHandler(filesController.downloadFile),
// );
//
// router.get(
//     '/list',
//     validate({ query: validator.getSchema('filesListQuery') }),
//     asyncHandler(filesController.getFileDataList),
// );
//
// router.delete(
//     '/delete/:id',
//     validate({ params: validator.getSchema('fileId') }),
//     asyncHandler(filesController.deleteFile),
// );
//
// router.get(
//     '/:id',
//     validate({ params: validator.getSchema('fileId') }),
//     asyncHandler(filesController.getFileData),
// );
//
// router.put(
//     '/update/:id',
//     validate({
//         params: validator.getSchema('fileId'),
//         body: validator.getSchema('updateFile'),
//     }),
//     asyncHandler(filesController.updateFileData),
// );




module.exports = router
