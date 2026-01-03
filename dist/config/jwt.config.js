"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const jwtConfig = () => ({
    secret: process.env.JWT_SECRET || 'your-super-secret-key-here',
    expiresIn: '7d',
});
exports.jwtConfig = jwtConfig;
//# sourceMappingURL=jwt.config.js.map