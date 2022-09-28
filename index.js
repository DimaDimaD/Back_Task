require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const cookieParser = require(   'cookie-parser');
const fileUpload = require('express-fileupload');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'files')));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

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