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
exports.UserAnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_answer_entity_1 = require("./entities/user-answer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const progress_entity_1 = require("../progress/entities/progress.entity");
const question_entity_1 = require("../question/entities/question.entity");
let UserAnswerService = class UserAnswerService {
    userAnswerRepo;
    userRepo;
    questionRepo;
    progressRepo;
    constructor(userAnswerRepo, userRepo, questionRepo, progressRepo) {
        this.userAnswerRepo = userAnswerRepo;
        this.userRepo = userRepo;
        this.questionRepo = questionRepo;
        this.progressRepo = progressRepo;
    }
    async upsertAnswer(dto) {
        const { userId, questionId, selectedOptionIndex } = dto;
        const user = await this.userRepo.findOneByOrFail({ id: userId });
        const question = await this.questionRepo.findOne({
            where: { id: questionId },
            relations: ['lesson'],
        });
        if (!question)
            throw new common_1.NotFoundException('Pregunta no encontrada');
        const isCorrect = question.correctOptionIndex === selectedOptionIndex;
        let answer = await this.userAnswerRepo.findOne({
            where: { user: { id: user.id }, question: { id: question.id } },
            relations: ['question'],
        });
        if (answer) {
            answer.selectedOptionIndex = selectedOptionIndex;
            answer.isCorrect = isCorrect;
        }
        else {
            answer = this.userAnswerRepo.create({
                user,
                question,
                selectedOptionIndex,
                isCorrect,
            });
        }
        await this.userAnswerRepo.save(answer);
        await this.updateProgress(user, question.lesson);
        return answer;
    }
    async updateProgress(user, lesson) {
        const totalQuestions = await this.questionRepo.count({
            where: { lesson: { id: lesson.id } },
        });
        const correctAnswers = await this.userAnswerRepo.count({
            where: {
                user: { id: user.id },
                question: { lesson: { id: lesson.id } },
                isCorrect: true,
            },
        });
        const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
        let progress = await this.progressRepo.findOne({
            where: {
                user: { id: user.id },
                lesson: { id: lesson.id },
            },
        });
        if (!progress) {
            progress = this.progressRepo.create({
                user,
                lesson,
                score,
                completed: score === 100,
            });
        }
        else {
            progress.score = score;
            progress.completed = score === 100;
        }
        await this.progressRepo.save(progress);
    }
    async findAll() {
        return this.userAnswerRepo.find({ relations: ['user', 'question'] });
    }
    async findOne(id) {
        return this.userAnswerRepo.findOneOrFail({ where: { id }, relations: ['user', 'question'] });
    }
    async remove(id) {
        const answer = await this.userAnswerRepo.findOne({
            where: { id },
            relations: ['user', 'question'],
        });
        if (!answer)
            throw new common_1.NotFoundException();
        await this.userAnswerRepo.remove(answer);
        await this.updateProgress(answer.user, answer.question.lesson);
    }
};
exports.UserAnswerService = UserAnswerService;
exports.UserAnswerService = UserAnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_answer_entity_1.UserAnswer)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(3, (0, typeorm_1.InjectRepository)(progress_entity_1.Progress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserAnswerService);
//# sourceMappingURL=user-answer.service.js.map