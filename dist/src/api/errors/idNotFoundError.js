"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IdNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'IdNotFoundError';
        this.stack = '404';
    }
}
exports.default = IdNotFoundError;
