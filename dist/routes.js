"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer = require('multer');
const router = (0, express_1.Router)();
exports.router = router;
const multerConfig = multer();
router.post("/upload", multerConfig.single("file"), function (_req, _res) {
    var _a;
    console.log((_a = _req.file) === null || _a === void 0 ? void 0 : _a.buffer.toString("utf-8"));
    return _res.sendStatus(200);
});
//# sourceMappingURL=routes.js.map