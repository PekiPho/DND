import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto, MoveItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  getAll(){
    return this.itemService.getAll();
  }

  @Get('room/:roomId')
  getByRoom(@Param('roomId') roomId:number){
    return this.itemService.getByRoom(roomId)
  }

  @Get('character/:characterId')
  getByCharacter(@Param('characterId') characterId: number) {
    return this.itemService.getByCharacter(characterId);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.itemService.getOne(id);
  }

  @Post()
  create(@Body() dto: CreateItemDto) {
    return this.itemService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateItemDto) {
    return this.itemService.update(id, dto);
  }

  @Patch(':id/move')
  move(@Param('id') id: number, @Body() dto: MoveItemDto) {
    return this.itemService.move(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemService.remove(id);
  }
}
