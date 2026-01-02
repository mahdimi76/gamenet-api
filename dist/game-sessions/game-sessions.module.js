"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSessionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const game_sessions_service_1 = require("./game-sessions.service");
const game_sessions_controller_1 = require("./game-sessions.controller");
const game_session_entity_1 = require("./entities/game-session.entity");
let GameSessionsModule = class GameSessionsModule {
};
exports.GameSessionsModule = GameSessionsModule;
exports.GameSessionsModule = GameSessionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([game_session_entity_1.GameSession])],
        controllers: [game_sessions_controller_1.GameSessionsController],
        providers: [game_sessions_service_1.GameSessionsService],
        exports: [game_sessions_service_1.GameSessionsService],
    })
], GameSessionsModule);
//# sourceMappingURL=game-sessions.module.js.map