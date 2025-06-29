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
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lesson_entity_1 = require("./entities/lesson.entity");
const typeorm_2 = require("typeorm");
const lesson_recommendation_service_1 = require("./service/lesson-recommendation.service");
let LessonsService = class LessonsService {
    lessonRepo;
    lessonRecommendationService;
    constructor(lessonRepo, lessonRecommendationService) {
        this.lessonRepo = lessonRepo;
        this.lessonRecommendationService = lessonRecommendationService;
    }
    async create(createLessonDto) {
        const { questions, ...rest } = createLessonDto;
        const lesson = await this.lessonRepo.create({
            ...rest,
            questions: questions?.map(q => ({
                ...q,
            })),
        });
        return this.lessonRepo.save(lesson);
    }
    async getRecommendedLesson(user) {
        return this.lessonRecommendationService.getNextLesson(user);
    }
    async findAll() {
        return this.lessonRepo.find();
    }
    async findOne(id) {
        const lesson = await this.lessonRepo.findOneBy({ id });
        if (!lesson)
            throw new common_1.NotFoundException(`No se a encontrado ninguna leccion con el id ${id}`);
        return lesson;
    }
    async update(id, updateLessonDto) {
        const lesson = await this.lessonRepo.findOneBy({ id });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lección con id ${id} no encontrada`);
        }
        Object.assign(lesson, updateLessonDto);
        return this.lessonRepo.save(lesson);
    }
    async remove(id) {
        const resultado = await this.lessonRepo.delete(id);
        if (resultado.affected === 0)
            throw new common_1.NotFoundException(`Leccion con id ${id} no encotrada`);
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        lesson_recommendation_service_1.LessonRecommendationService])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map