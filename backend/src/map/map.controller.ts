import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  getAll(@Param('roomId') roomId: number) {
    return this.mapService.getAll(roomId);
  }

  @Get(':id')
  getOne(@Param('roomId') roomId: number, @Param('id') id: number) {
    return this.mapService.getOne(roomId, id);
  }

  @Post()
  create(@Param('roomId') roomId: number, @Body() dto: CreateMapDto) {
    return this.mapService.create(roomId, dto);
  }

  @Patch(':id')
  update(
    @Param('roomId') roomId: number,
    @Param('id') id: number,
    @Body() dto: UpdateMapDto,
  ) {
    return this.mapService.update(roomId, id, dto);
  }

  @Patch(':id/set-active')
  setActive(@Param('roomId') roomId: number, @Param('id') id: number) {
    return this.mapService.setActive(roomId, id);
  }

  @Delete(':id')
  remove(@Param('roomId') roomId: number, @Param('id') id: number) {
    return this.mapService.remove(roomId, id);
  }
}
