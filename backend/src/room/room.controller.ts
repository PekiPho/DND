import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, JoinRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  getAll() {
    return this.roomService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.roomService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() dto: CreateRoomDto) {
    return this.roomService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  join(
    @Param('id') id: number,
    @Request() req: any,
    @Body() dto: JoinRoomDto,
  ) {
    return this.roomService.join(id, req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/leave')
  leave(@Param('id') id: number, @Request() req: any) {
    return this.roomService.leave(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Request() req: any,
    @Body() dto: UpdateRoomDto,
  ) {
    return this.roomService.update(id, req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Request() req: any) {
    return this.roomService.remove(id, req.user.id);
  }
}
