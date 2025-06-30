import { Controller, Post, Body, Get, Param, Headers, UnauthorizedException, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiTags, ApiHeader, ApiOperation } from '@nestjs/swagger';

@ApiTags('Progress')
@Controller('progress')
export class ProgressController {
  constructor(
    private readonly progressService: ProgressService,
    // Inyectamos UserRepo para la autenticación manual
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // --- Endpoint principal para el frontend ---
  @Post()
  @ApiOperation({ summary: 'Record or update user progress for a lesson' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer Token' })
  async recordProgress(
    @Headers('authorization') authHeader: string,
    @Body() createProgressDto: CreateProgressDto,
  ) {
    const user = await this.getUserFromToken(authHeader);
    return this.progressService.recordProgress(user, createProgressDto);
  }

  // --- Endpoints CRUD adicionales (útiles para administración) ---
  @Get()
  @ApiOperation({ summary: 'Get all progress records (Admin)' })
  findAll() {
    return this.progressService.findAll();
  }

  @Get('user/me') // Ruta más RESTful para obtener el progreso del usuario actual
  @ApiOperation({ summary: 'Get all progress for the current authenticated user' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer Token' })
  async findAllByCurrentUser(@Headers('authorization') authHeader: string) {
    const user = await this.getUserFromToken(authHeader);
    return this.progressService.findByUser(user.id);
  }
  
  @Get('lesson/:id')
  @ApiOperation({ summary: 'Get all progress records for a specific lesson (Admin)' })
  findAllByLesson(@Param('id', ParseIntPipe) id: number) {
    return this.progressService.findByLesson(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single progress record by its ID (Admin)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.progressService.findOne(id);
  }

  // Los endpoints Patch y Delete usualmente no son necesarios para el progreso,
  // pero los dejamos por si son para un panel de admin.
  @Patch(':id')
  @ApiOperation({ summary: 'Update a progress record (Admin)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.update(id, updateProgressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a progress record (Admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.progressService.remove(id);
  }


  // --- Helper para no repetir el código de autenticación ---
  private async getUserFromToken(authHeader: string): Promise<User> {
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

    const userId = payload.sub || payload.id;
    if (!userId) {
      throw new UnauthorizedException('Token payload is missing user identifier');
    }

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}