import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  
  constructor(
    @InjectRepository(Token)
    private tokenRepo: Repository<Token>,
  ){}

  async getAll(mapId:number){
    return this.tokenRepo.find({
      where: {map: {id:mapId}},
      relations: {character: true},
    });
  }

  async getOne(mapId:number, id:number){
    const token= await this.tokenRepo.findOne({
      where: {id, map: { id: mapId}},
      relations: {character:true},
    });

    if(!token) throw new NotFoundException('Token Not Found');

    return token;
  }

  async create(mapId:number,dto:CreateTokenDto){
    const token = this.tokenRepo.create({
      ...dto,
      map: {id: mapId},
      character: dto.characterId ? {id:dto.characterId} : undefined,
      layer: dto.layerId ? {id: dto.layerId} : undefined,
    });

    return this.tokenRepo.save(token);
  }

  async update(mapId:number, id:number,dto:UpdateTokenDto){
    const token = await this.getOne(mapId,id);

    Object.assign(token,dto);
    return this.tokenRepo.save(token);
  }

  async remove(mapId:number,id:number){
    const token = await this.getOne(mapId,id);

    return this.tokenRepo.remove(token);
  }
}
