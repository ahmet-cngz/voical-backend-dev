"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: __dirname + '/../.env' });
const server = express_1.default();
//midwares
server.use(cors_1.default());
server.use(helmet_1.default());
server.listen(process.env.PORT, () => `http://localhost:${process.env.PORT}`);
