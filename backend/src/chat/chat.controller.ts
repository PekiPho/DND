import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('rooms/:roomId/chat')
export class ChatController {
  
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getAll(@Param('roomId') roomId: number) {
    return this.chatService.getAll(roomId);
  }
  
  @Get()
  getMessages(
    @Param('roomId') roomId: number,
    @Query('before') before?: number,
    @Query('limit') limit?: number,
  ) {
    return this.chatService.getMessages(roomId, before, limit);
  }

  @Post()
  create(
    @Param('roomId') roomId: number,
    @Body() dto: CreateChatDto,
  ) {
    return this.chatService.create(roomId, dto);
  }

}
