const filesService = require('../service/file-service');
const StatusCodes = require('http-status-codes');
const FilesRepository = require('../help/repository');

class FilesController {
    async uploadFile(req, res, next) {

        let filedata = req.file;
        console.log(filedata);
        if(!filedata)
            res.send("Ошибка при загрузке файла");
        else
           return res.json("Файл загружен");

    }


    // downloadFile = async (req, res) => {
    //     const { params: { id } } = req;
    //
    //     const { file, mimetype, size } = await filesService.downloadFile(id);
    //
    //     res.set({
    //         'Accept-Ranges': 'bytes',
    //         'Content-Length': size,
    //         'Content-Type': mimetype,
    //     });
    //
    //     res.status(StatusCodes.OK).send(file);
    // };
    //
    // deleteFile = async (req, res) => {
    //     const { params: { id } } = req;
    //     await filesService.deleteFile(id);
    //
    //     res.status(StatusCodes.NO_CONTENT).send();
    // };
    //
    // getFileDataList = async (req, res) => {
    //     const {
    //         query: {
    //             list_size: listSize = 10,
    //             page = 1,
    //         },
    //     } = req;
    //
    //     const list = await filesService.getFileDataList({ listSize, page });
    //
    //     res.status(StatusCodes.OK).json(list);
    // };
    //
    // getFileData = async (req, res) => {
    //     const { params: { id } } = req;
    //     const fileData = await filesService.getFileData(id);
    //
    //     res.status(StatusCodes.OK).json(fileData);
    // };
    //
    // updateFileData = async (req, res) => {
    //     const { params: { id }, body: { name } } = req;
    //     const fileData = await filesService.updateFileData({ id, name });
    //
    //     res.status(StatusCodes.OK).json(fileData);
    // };
}

module.exports = new FilesController();
