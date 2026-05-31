import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { Room } from '../room/entities/room.entity';

@Injectable()
export class CharacterService {
  
  constructor(
    @InjectRepository(Character)
    private characterRepo: Repository<Character>,

    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
  ){}

  async getAll(){
    return this.characterRepo.find({
      relations: {user: true},
    });
  }

  async getByUser(userId:number){
    return this.characterRepo.find({
      where: {user: {id:userId}},
    });
  }

  async getOne(id:number){
    const character = await this.characterRepo.findOne({
      where: {id},
      relations: {user:true, items:true, spells: true},
    });

    if(!character) throw new NotFoundException('Character Not Found');

    return character;
  }

  async create(dto:CreateCharacterDto){
    const character = this.characterRepo.create({
      ...dto,
      user: dto.userId ? {id: dto.userId} : undefined,
    });

    const saved = await this.characterRepo.save(character);


    if (dto.roomId) {
      const room = await this.roomRepo.findOne({
        where: { id: dto.roomId },
        relations: { participants: true },
      });
      if (!room) throw new NotFoundException('Room Not Found');
      room.participants.push(saved);
      await this.roomRepo.save(room);
    }

    return saved;
  }

  async update(id:number, dto:UpdateCharacterDto){
    const character = await this.getOne(id);
    Object.assign(character,dto);
    
    return this.characterRepo.save(character);
  }

  async remove(id:number){
    const character = await this.getOne(id);
    return this.characterRepo.remove(character);
  }
}
