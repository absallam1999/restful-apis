"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    const url = req.url;
    const status = res.statusCode;
    const method = req.method;
    const proto = req.protocol;
    const date = new Date();
    console.log(`${url} --was visted! \n '${method} -- ${proto} -- ${status}' \n [${date}] \n`);
    next();
};
exports.default = logger;
