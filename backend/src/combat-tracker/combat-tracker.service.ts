import { Injectable } from '@nestjs/common';
import { CreateCombatTrackerDto } from './dto/create-combat-tracker.dto';
import { UpdateCombatTrackerDto } from './dto/update-combat-tracker.dto';

@Injectable()
export class CombatTrackerService {
  create(createCombatTrackerDto: CreateCombatTrackerDto) {
    return 'This action adds a new combatTracker';
  }

  findAll() {
    return `This action returns all combatTracker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} combatTracker`;
  }

  update(id: number, updateCombatTrackerDto: UpdateCombatTrackerDto) {
    return `This action updates a #${id} combatTracker`;
  }

  remove(id: number) {
    return `This action removes a #${id} combatTracker`;
  }
}
