import { Router } from "express";
const multer  = require('multer');
const upload = multer({ dest: 'uploads/'})

const router = Router();

router.post(
    "/upload", 
    upload.single("file"), function (_req, _res) {
        console.log(_req.file);
        return _res.sendStatus(200);
    }
);

export { router };