"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
require("dotenv/config");
const PORT = process.env.APP_PORT || 3001;
new App_1.default().start(PORT);
