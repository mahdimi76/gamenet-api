"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_2 = require("./config");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const game_net_module_1 = require("./modules/game-net/game-net.module");
const devices_module_1 = require("./modules/devices/devices.module");
const customers_module_1 = require("./modules/customers/customers.module");
const products_module_1 = require("./modules/products/products.module");
const game_sessions_module_1 = require("./modules/game-sessions/game-sessions.module");
const transactions_module_1 = require("./modules/transactions/transactions.module");
const orders_module_1 = require("./modules/orders/orders.module");
const settings_module_1 = require("./modules/settings/settings.module");
const services_module_1 = require("./modules/services/services.module");
const subscriptions_module_1 = require("./modules/subscriptions/subscriptions.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot((0, config_2.databaseConfig)()),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            game_net_module_1.GameNetModule,
            devices_module_1.DevicesModule,
            customers_module_1.CustomersModule,
            products_module_1.ProductsModule,
            game_sessions_module_1.GameSessionsModule,
            transactions_module_1.TransactionsModule,
            orders_module_1.OrdersModule,
            settings_module_1.SettingsModule,
            services_module_1.ServicesModule,
            subscriptions_module_1.SubscriptionsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map