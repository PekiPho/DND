import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CombatTrackerService } from './combat-tracker.service';
import { CreateCombatTrackerDto,UpdateCombatTrackerDto } from './dto/create-combat-tracker.dto';

@Controller('rooms/:roomId/combat-tracker')
export class CombatTrackerController {
  constructor(private readonly combatTrackerService: CombatTrackerService) {}

  @Post()
  addEntry(
    @Param('roomId') roomId:number,
    @Body() body: CreateCombatTrackerDto
  ){
    return this.combatTrackerService.addEntry(roomId,body.characterId,body.roll);
  }

  @Patch('sort')
  sort(@Param('roomId') roomId:number){
    return this.combatTrackerService.sort(roomId);
  }

  @Patch(':characterId')
  updateRoll(
    @Param('roomId') roomId:number,
    @Param('characterId') characterId:number,
    @Body() body: UpdateCombatTrackerDto,
  ){
    if(body.roll ===undefined) throw new BadRequestException("Roll is Missing");
    return this.combatTrackerService.updateRoll(roomId,characterId,body.roll);
  }

  @Delete('clear')
  clearAll(@Param('roomId') roomId:number){
    return this.combatTrackerService.clearAll(roomId);
  }

  @Delete(':id')
  removeEntry(@Param('id') id:number){
    return this.combatTrackerService.removeEntry(id);
  }
}
