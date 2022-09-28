const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const filesController = require('../controllers/files-controller');

const {body} = require('express-validator');

const router = new Router();


router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/signin', userController.login);
router.get('/logout', userController.logout);
router.post('/signin/new_token', userController.refresh);
router.get('/info/:id', userController.getInfo)

router.post('/file/upload', filesController.uploadFile);
router.get('/file/list', filesController.getAllFiles);
router.get('/file/:id', filesController.getFile);
router.get('/file/download/:id', filesController.downloadFile);

router.delete('/file/delete/:id', filesController.deleteFile);

router.put('/file/update/:id', filesController.updateFile);


module.exports = router
