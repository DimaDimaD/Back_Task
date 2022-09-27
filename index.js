require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const cookieParser = require(   'cookie-parser')
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const multer = require("multer");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(__dirname));
app.use(multer({dest: 'files'}).single('file'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);
app.post('/api/upload', function (req, res, next) {

    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});

app.use(errorMiddleware); //Обработчик ошибок


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();