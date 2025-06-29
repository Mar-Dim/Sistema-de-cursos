import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';

@Controller('user-answers')
export class UserAnswerController {
  constructor(private readonly service: UserAnswerService) {}

  @Post('upsert')
  upsert(@Body() dto: CreateUserAnswerDto) {
    return this.service.upsertAnswer(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
