
const {FileSchema} = require('../models/file-model')
const config = require('config')
const fs = require('fs')
const path = require('path')


class FilesController {

    async uploadFile(req, res, ) {
        try {
            const file = req.files.file
            const filePath = `./files/${file.name}`

            if (fs.existsSync(filePath)) {
                return res.status(400).json({message: 'Файл уже существует'})
            }

            file.mv(filePath)

            const filetype = file.name.split('.').pop()
            const uploadDate = Date.now()

            const uploadedFile = await FileSchema.create ({
                filename: file.name,
                filetype: `${filetype}`,
                mimeType: file.mimetype,
                size: file.size,
                uploadDate,
            })

            await uploadedFile.save()

            return res.json(uploadedFile)

        } catch (e) {
            console.log(e);
            return res.status(500).json({message: "Upload error"})
        }
    }

    async getFile(req, res) {
        const {id} = req.params;
        const file = await FileSchema.findOne(
            {
                where: {id}
            }
        );
        return res.json(file);
    }

    async getAllFiles(req, res) {
        let {limit, page} = req.query;
        console.log(req.query)
        page = Number(page) || 1;
        limit = Number(limit) || 10;
        let offset = (page * limit) - limit;

        let files;
        files = await FileSchema.findAndCountAll({offset:offset,limit:limit});

        return res.json(files);
    }

    async downloadFile(req, res) {
        try {
            const file = await FileSchema.findOne({id: req.params.id})
            const path = config.get('downloadFile') + file.filename
            if (fs.existsSync(path)) {
                return res.download(path, file.name)
            }
            return res.status(400).json({message: "Download error"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Download error"})
        }
    }


    async deleteFile(req, res) {
        const {id} = req.params;
        const file = await FileSchema.findOne(
            {
                where: {id}
            }
        );
        const path = `./files/${file.filename}`
        fs.unlinkSync(path)
        await FileSchema.destroy({where: {id}});
        return res.status(200);
    }

    async updateFile(req, res) {
        let {id} = req.params
        let {filename,filetype,mimeType,size} = req.body;

        const uploadDate = Date.now()
        await FileSchema.update(
            {filename,filetype,mimeType,size,uploadDate},
            {where: {id}});
        return res.status(200)
    }
}

module.exports = new FilesController();
