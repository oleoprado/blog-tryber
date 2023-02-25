"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    static handle(err, _req, res, _next) {
        if (err instanceof Error && err.stack) {
            return res.status(parseInt(err.stack)).json({ message: err.message });
        }
        return res.status(500).json({ message: 'Erro não identificado' });
    }
}
exports.default = ErrorHandler;
