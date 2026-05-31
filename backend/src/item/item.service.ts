import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto, MoveItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  

  constructor(
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
  ){}

  async getAll(){
    return this.itemRepo.find({
      relations: {character:true, room:true},
    });
  }

  async getByCharacter(characterId:number){
    return this.itemRepo.find({
      where: {character: {id: characterId}},
    });
  }

  async getByRoom(roomId:number){
    return this.itemRepo.find({
      where:{ room: {id: roomId}},
    });
  }

  async getOne(id:number){
    const item = await this.itemRepo.findOne({
      where:{ id},
      relations: { character: true, room:true},
    });

    if(!item) throw new NotFoundException("Item Not Found");
    return item;
  }

  async create(dto:CreateItemDto){
    if(dto.characterId && dto.roomId)
      throw new BadRequestException("Item must belong to a character only or only to a room (shop)");

    const item= this.itemRepo.create({
      ...dto,
      character: dto.characterId ? {id:dto.characterId} :undefined,
      room: dto.roomId ? {id: dto.roomId} : undefined,
    });

    return this.itemRepo.save(item);
  }

  async update(id:number, dto:UpdateItemDto){
    const item = await this.getOne(id);
    Object.assign(item,dto);

    return this.itemRepo.save(item);
  }

  async move(id:number, dto: MoveItemDto){

    if(dto.characterId && dto.roomId)
      throw new BadRequestException("Item must belong to a character only or only to a room (shop)");

    const item = await this.getOne(id);
    item.character = dto.characterId ? { id: dto.characterId } as any : null;
    item.room = dto.roomId ? { id: dto.roomId } as any : null;

    return this.itemRepo.save(item);
  }

  async remove(id:number){
    const item= await this.getOne(id);

    return this.itemRepo.remove(item);
  }
}
