import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  getAll() {
    return this.characterService.getAll();
  }

  @Get('user/:userId')
  getByUser(@Param('userId') userId: number) {
    return this.characterService.getByUser(userId);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.characterService.getOne(id);
  }

  @Post()
  create(@Body() dto: CreateCharacterDto) {
    return this.characterService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCharacterDto) {
    return this.characterService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.characterService.remove(id);
  }
}
