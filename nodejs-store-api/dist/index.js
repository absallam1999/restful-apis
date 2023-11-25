"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_middleware_1 = __importDefault(require("./middlewares/logger.middleware"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
// Create Instance Server
const app = (0, express_1.default)();
const PORT = 3000;
// Middlewares
app.use((0, cors_1.default)(), //  Cors Middleware
logger_middleware_1.default, //  Logger Middleware
(0, helmet_1.default)(), //  Security Middleware
express_1.default.json() // JSON Parser
);
// Routing For ('/api') Path
app.use('/api', index_routes_1.default);
// Routing For ('/') Path
app.get('/', (req, res) => {
    res.send('Server Started!');
});
// Routing For Bad Requests
app.use((req, res) => {
    res.status(404).json({
        message: '404 NOT FOUND!',
    });
});
// Server listener
app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});
exports.default = app;
