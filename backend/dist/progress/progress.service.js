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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const progress_entity_1 = require("./entities/progress.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const lesson_entity_1 = require("../lessons/entities/lesson.entity");
let ProgressService = class ProgressService {
    progressRepo;
    userRepo;
    lessonRepo;
    constructor(progressRepo, userRepo, lessonRepo) {
        this.progressRepo = progressRepo;
        this.userRepo = userRepo;
        this.lessonRepo = lessonRepo;
    }
    async create(createProgressDto) {
        const { user_id, lesson_id, ...rest } = createProgressDto;
        const user = await this.userRepo.findOneByOrFail({ id: user_id });
        const lesson = await this.lessonRepo.findOneByOrFail({ id: lesson_id });
        const existing = this.progressRepo.findOneBy({
            user: user, lesson: lesson
        });
        if (!existing)
            throw new common_1.ConflictException('Ya existe un progreso para este usuario');
        const progress = await this.progressRepo.create({
            user,
            lesson,
            ...rest,
        });
        return this.progressRepo.save(progress);
    }
    async findAll() {
        return await this.progressRepo.find({
            relations: ['user', 'lesson']
        });
    }
    async findOne(id) {
        const progress = await this.progressRepo.findOneBy({ id });
        if (!progress)
            throw new common_1.NotFoundException(`No se encontro el progreso con identificador ${id}`);
        return progress;
    }
    async findByUser(id) {
        const progress = await this.progressRepo.findBy({ user: { id } });
        if (!progress)
            throw new common_1.NotFoundException(`No se encontro ningun progreso del usuario con id ${id}`);
        return progress;
    }
    async findByLesson(id) {
        const progress = await this.progressRepo.findBy({ lesson: { id } });
        if (!progress)
            throw new common_1.NotFoundException(`No se encontro el progreso asociado a la leccion con id  ${id}`);
        return progress;
    }
    async update(id, updateProgressDto) {
        const progress = await this.progressRepo.findOneBy({ id });
        if (!progress)
            throw new common_1.NotFoundException(`No se encontro el progreso con identificador ${id}`);
        Object.assign(progress, updateProgressDto);
        return this.progressRepo.save(progress);
    }
    async remove(id) {
        const resultado = await this.progressRepo.delete(id);
        if (resultado.affected === 0)
            throw new common_1.NotFoundException(`No se a encontrado el progreso a eliminar`);
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(progress_entity_1.Progress)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProgressService);
//# sourceMappingURL=progress.service.js.map