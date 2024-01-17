const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Ajuste o caminho para a pasta uploads que está dentro da pasta src
const uploadPath = path.join(__dirname, '..', 'uploads', 'files');

const imageStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        // Verifique se a pasta existe ou crie-a
        fs.mkdirSync(uploadPath, { recursive: true });
        callBack(null, uploadPath);
    },
    filename: (req, file, callBack) => {
        // Use o timestamp e a extensão do arquivo original para criar um nome de arquivo único
        const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).slice(2)}${path.extname(file.originalname)}`;
        callBack(null, uniqueSuffix);
    }
});

const fileUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, callBack) {
        // Filtre apenas arquivos .txt
        if (!file.originalname.match(/\.(txt)$/)) {
            return callBack(new Error("Por favor, envie apenas arquivos .txt"));
        }
        callBack(null, true);
    }
});

module.exports = { fileUpload };
