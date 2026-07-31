import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto, JoinRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class RoomService {
  
  constructor(
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
  ) {}

  async getAll(){
    return this.roomRepo.find({
      relations: {host: true},
    });
  }

  async getOne(id:number){
    const room = await this.roomRepo.findOne({
      where: {id},
      relations: {host: true, players: true, participants: true, maps: true},
    });

    if(!room) throw new NotFoundException('Room Not Found');

    return room;
  }

  async create(userId:number, dto:CreateRoomDto){
    const passwordHash = await bcrypt.hash(dto.password,10);

    const room= this.roomRepo.create({
      name:dto.name,
      maxPlayers: dto.maxPlayers,
      passwordHash,
      host: {id:userId},
      description: dto.description,
    });

    return this.roomRepo.save(room);
  }

  async join(roomId:number,userId: number, dto:JoinRoomDto){
    const room = await this.roomRepo.findOne({
      where:{id:roomId},
      relations: {players:true},
    });

    if(!room) throw new NotFoundException("Room Not Found");

    const isMatch = await bcrypt.compare(dto.password,room.passwordHash);
    if(!isMatch) throw new ForbiddenException("Wrong Password");

    if(room.players.length >= room.maxPlayers)
      throw new BadRequestException('Room Is Full');

    const alreadyJoined = room.players.some(p => p.id === userId);
    if(!alreadyJoined){
      room.players.push({id:userId} as any);
      await this.roomRepo.save(room);
    }

    return room;
  }

  async leave(roomId:number, userId:number){
    const room = await this.roomRepo.findOne({
      where: {id:roomId},
      relations: { players: true, participants: true},
    });

    if(!room) throw new NotFoundException('Room Not Found');

    room.players= room.players.filter(p => p.id !== userId);
    room.participants = room.participants.filter(p=> p.user?.id !== userId);

    return this.roomRepo.save(room);
  }

  async update(id:number,userId:number, dto:UpdateRoomDto){
    const room = await this.getOne(id);

    if(room.host.id !== userId) throw new ForbiddenException("Only The Host Can Update");

    if (dto.name) room.name = dto.name;
    if (dto.maxPlayers) room.maxPlayers = dto.maxPlayers;
    if (dto.password) room.passwordHash = await bcrypt.hash(dto.password, 10);
    if (dto.description !== undefined) room.description = dto.description;

    return this.roomRepo.save(room);
  }

   async remove(id: number, userId: number) {
    const room = await this.getOne(id);

    if (room.host.id !== userId) throw new ForbiddenException('Only The Host Can Delete');

    return this.roomRepo.remove(room);
  }
}
