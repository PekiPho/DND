import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCombatTrackerDto } from './dto/create-combat-tracker.dto';
import { UpdateCombatTrackerDto } from './dto/create-combat-tracker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CombatTracker } from './entities/combat-tracker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CombatTrackerService {
  
  constructor(
    @InjectRepository(CombatTracker)
    private trackerRepo: Repository<CombatTracker>,
  ){}

  async getAll(roomId:number){
    return this.trackerRepo.find({
      where: {room: {id:roomId}},
      order: {order: 'ASC'}
    });
  }

  async addEntry(roomId:number, characterId:number, roll:number){
    const entry = this.trackerRepo.create({
      roll,
      room: { id: roomId},
      character: {id:characterId},
    });

    return this.trackerRepo.save(entry);
  }

  async sort(roomId:number){
    const entries = await this.trackerRepo.find({
      where: { room: {id:roomId}},
      order: { roll: 'ASC'},
    });

    const updated = entries.map((entry,index)=>({
      ...entry,
      order:index,
    }));

    return this.trackerRepo.save(updated);
  }

  async updateRoll(roomId: number, characterId: number, roll: number) {
  const entry = await this.trackerRepo.findOne({
    where: { 
      room: { id: roomId }, 
      character: { id: characterId } 
    },
  });
  
  if (!entry) throw new NotFoundException('Entry not found');

  entry.roll = roll;
  return this.trackerRepo.save(entry);
}

  async removeEntry(id:number){
    const entry= await this.trackerRepo.findOneBy({id});

    if(!entry) throw new NotFoundException("Not Found");
    return this.trackerRepo.remove(entry);
  }

  async clearAll(roomId:number){
    const entries = await this.trackerRepo.find({
      where: { room: { id: roomId}},
    });

    return this.trackerRepo.remove(entries);
  }


}
