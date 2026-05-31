import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Map } from './entities/map.entity';

@Injectable()
export class MapService {
  
  constructor(
    @InjectRepository(Map)
    private mapRepo: Repository<Map>,
  ){}

  async getAll(roomId:number){
    return this.mapRepo.find({
      where: {room: {id: roomId}},
    });
  }

  async getOne(roomId:number,id: number){
    const map= await this.mapRepo.findOne({
      where: {id, room: {id:roomId}},
      relations: {layers: true, tokens: true},
    });

    if(!map) throw new NotFoundException("Map Not Found");

    return map;
  }

  async create(roomId: number, dto:CreateMapDto){
    const map = await this.mapRepo.create({
      ...dto,
      room: { id: roomId},
    });

    return this.mapRepo.save(map);
  }

  async update(roomId:number, id:number, dto: UpdateMapDto){
    const map = await this.getOne(roomId,id);
    Object.assign(map,dto);
    return this.mapRepo.save(map);
  }

  async setActive(roomId:number, id:number){

    await this.mapRepo
      .createQueryBuilder()
      .update(Map)
      .set({isActive: false})
      .where('roomId = :roomId', {roomId})
      .execute();

    const map = await this.getOne(roomId,id);
    map.isActive= true;
    return this.mapRepo.save(map);
  }

  async remove(roomId:number,id:number){
    const map = await this.getOne(roomId,id);
    return this.mapRepo.remove(map);
  }
}
