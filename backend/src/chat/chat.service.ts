import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  
  constructor(
    @InjectRepository(Chat)
    private chatRepo: Repository<Chat>,
  ){}
  

  async getAll(roomId:number){
    return this.chatRepo.find({
      where: { room: {id: roomId}},
      order: { createdAt: 'ASC'},
    });
  }

  async create(roomId:number, dto:CreateChatDto){
    const chat = this.chatRepo.create({
      message:dto.message,
      diceRoll: dto.diceRoll ?? false,
      room: { id:roomId},
      sender: { id:dto.senderId},
    });

    return this.chatRepo.save(chat);
  }

  async getMessages(roomId:number, before?:number, limit = 50){
    const query = this.chatRepo.createQueryBuilder('chat')
      .where('chat.roomId = :roomId', {roomId})
      .orderBy('chat.createdAt', 'DESC')
      .take(limit);

    if(before){
      query.andWhere('chat.id < :before', {before});
    }

    const messages = await query.getMany();
    return messages.reverse();
  }
}
