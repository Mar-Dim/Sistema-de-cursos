"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAnswerModule = void 0;
const common_1 = require("@nestjs/common");
const user_answer_service_1 = require("./user-answer.service");
const user_answer_controller_1 = require("./user-answer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_answer_entity_1 = require("./entities/user-answer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const question_entity_1 = require("../question/entities/question.entity");
const progress_entity_1 = require("../progress/entities/progress.entity");
let UserAnswerModule = class UserAnswerModule {
};
exports.UserAnswerModule = UserAnswerModule;
exports.UserAnswerModule = UserAnswerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_answer_entity_1.UserAnswer, user_entity_1.User, question_entity_1.Question, progress_entity_1.Progress])
        ],
        controllers: [user_answer_controller_1.UserAnswerController],
        providers: [user_answer_service_1.UserAnswerService],
    })
], UserAnswerModule);
//# sourceMappingURL=user-answer.module.js.map