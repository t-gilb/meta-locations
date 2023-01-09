"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// request parsing
app.use(express_1.default.urlencoded({ extended: false }));
// json data
app.use(express_1.default.json());
// define cors
app.use((0, cors_1.default)());
// define routes if needed
// app.use("/", routes);
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳');
});
// error handling
app.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
        message: error.message,
    });
});
const httpServer = http_1.default.createServer(app);
exports.default = httpServer;
