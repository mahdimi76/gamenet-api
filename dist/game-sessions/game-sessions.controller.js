"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSessionsController = void 0;
const common_1 = require("@nestjs/common");
const game_sessions_service_1 = require("./game-sessions.service");
const session_dto_1 = require("./dto/session.dto");
const common_2 = require("../common");
let GameSessionsController = class GameSessionsController {
    gameSessionsService;
    constructor(gameSessionsService) {
        this.gameSessionsService = gameSessionsService;
    }
    create(createSessionDto) {
        return this.gameSessionsService.create(createSessionDto);
    }
    findAll(gameNetId, status) {
        if (gameNetId) {
            return this.gameSessionsService.findByGameNet(gameNetId, status);
        }
        return this.gameSessionsService.findAll();
    }
    getUnpaid(gameNetId) {
        return this.gameSessionsService.getUnpaidSessions(gameNetId);
    }
    findOne(id) {
        return this.gameSessionsService.findOne(id);
    }
    update(id, updateSessionDto) {
        return this.gameSessionsService.update(id, updateSessionDto);
    }
    endSession(id, endSessionDto) {
        return this.gameSessionsService.endSession(id, endSessionDto);
    }
};
exports.GameSessionsController = GameSessionsController;
__decorate([
    (0, common_2.Auth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_dto_1.CreateSessionDto]),
    __metadata("design:returntype", void 0)
], GameSessionsController.prototype, "create", null);
__decorate([
    (0, common_2.Auth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('gameNetId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GameSessionsController.prototype, "findAll", null);
__decorate([
    (0, common_2.Auth)(),
    (0, common_1.Get)('unpaid'),
    __param(0, (0, common_1.Query)('gameNetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameSessionsController.prototype, "getUnpaid", null);
__decorate([
    (0, common_2.Auth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameSessionsController.prototype, "findOne", null);
__decorate([
    (0, common_2.Auth)(),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, session_dto_1.UpdateSessionDto]),
    __metadata("design:returntype", void 0)
], GameSessionsController.prototype, "update", null);
__decorate([
    (0, common_2.Auth)(),
    (0, common_1.Patch)(':id/end'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, session_dto_1.EndSessionDto]),
    __metadata("design:returntype", void 0)
], GameSessionsController.prototype, "endSession", null);
exports.GameSessionsController = GameSessionsController = __decorate([
    (0, common_1.Controller)('game-sessions'),
    __metadata("design:paramtypes", [game_sessions_service_1.GameSessionsService])
], GameSessionsController);
//# sourceMappingURL=game-sessions.controller.js.map