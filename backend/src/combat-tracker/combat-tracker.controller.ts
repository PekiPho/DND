import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CombatTrackerService } from './combat-tracker.service';
import { CreateCombatTrackerDto } from './dto/create-combat-tracker.dto';
import { UpdateCombatTrackerDto } from './dto/update-combat-tracker.dto';

@Controller('combat-tracker')
export class CombatTrackerController {
  constructor(private readonly combatTrackerService: CombatTrackerService) {}

  @Post()
  create(@Body() createCombatTrackerDto: CreateCombatTrackerDto) {
    return this.combatTrackerService.create(createCombatTrackerDto);
  }

  @Get()
  findAll() {
    return this.combatTrackerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.combatTrackerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCombatTrackerDto: UpdateCombatTrackerDto) {
    return this.combatTrackerService.update(+id, updateCombatTrackerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combatTrackerService.remove(+id);
  }
}
