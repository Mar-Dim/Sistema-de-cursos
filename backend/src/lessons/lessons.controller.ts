import { Body, Post, Query, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Controller, Get, Request, UnauthorizedException, Headers, Inject } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import * as jwt from 'jsonwebtoken'; 
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { Lesson } from './entities/lesson.entity';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  @Get('path')
  @ApiOperation({ summary: 'Get the full learning path with user status' })
  @ApiHeader({ 
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  async getLessonsPathForUser(@Headers('authorization') authHeader: string) {
    // 1. Validar y decodificar el token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization token');
    }
    const token = authHeader.split(' ')[1];
    
    let payload;
    try {
      payload = jwt.verify(token, 'SECRET_JWT_KEY_123');
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // 2. Buscar al usuario en la base de datos a partir del payload
    // Asumimos que el payload contiene el ID de usuario como 'sub' o 'id'
    const userId = payload.sub || payload.id; 
    if (!userId) {
      throw new UnauthorizedException('Token payload is missing user identifier');
    }

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }


    return this.lessonsService.getLessonsPathForUser(user);
  }


  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get('recommendation')
  async getRecommendation(@Query('userId') userId: number) {
    const user = { id: userId } as User;
    const lesson = await this.lessonsService.getLessonsPathForUser(user);
    if (!lesson) throw new NotFoundException('No se pudo recomendar una lección.');
    return lesson;
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }

  @Get(':id/details')
  @ApiOperation({ summary: 'Get a single lesson with full details (content, questions)' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer Token' })
  async getDetails(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader: string, 
  ): Promise<Lesson> {
      return this.lessonsService.findOneWithDetails(id);
  }
}
