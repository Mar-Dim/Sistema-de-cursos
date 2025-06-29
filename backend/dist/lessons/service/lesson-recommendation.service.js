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
exports.LessonRecommendationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const progress_entity_1 = require("../../progress/entities/progress.entity");
const lesson_entity_1 = require("../entities/lesson.entity");
let LessonRecommendationService = class LessonRecommendationService {
    lessonRepo;
    progressRepo;
    constructor(lessonRepo, progressRepo) {
        this.lessonRepo = lessonRepo;
        this.progressRepo = progressRepo;
    }
    async getNextLesson(user) {
        const progress = await this.progressRepo.find({
            where: { user: { id: user.id } },
            relations: ['lesson'],
            order: { lesson: { order: 'ASC' } }
        });
        if (!progress || progress.length === 0) {
            const firstLesson = await this.lessonRepo.findOne({ order: { order: 'ASC' } });
            return firstLesson ?? null;
        }
        const lastProgress = progress.reverse().find(p => p.completed && p.score >= p.lesson.requiredScore) || progress[progress.length - 1];
        const nextOrder = lastProgress.lesson.order + 1;
        const nextLesson = await this.lessonRepo.findOne({ where: { order: nextOrder } });
        if (lastProgress.completed && lastProgress.score >= lastProgress.lesson.requiredScore && nextLesson) {
            return nextLesson;
        }
        return lastProgress.lesson;
    }
};
exports.LessonRecommendationService = LessonRecommendationService;
exports.LessonRecommendationService = LessonRecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(1, (0, typeorm_1.InjectRepository)(progress_entity_1.Progress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LessonRecommendationService);
//# sourceMappingURL=lesson-recommendation.service.js.map