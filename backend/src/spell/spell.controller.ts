import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpellService } from './spell.service';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';

@Controller('characters/:characterId/spells')
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @Get()
  getAll(@Param('characterId') characterId: number) {
    return this.spellService.getAll(characterId);
  }

  @Get(':id')
  getOne(@Param('characterId') characterId: number, @Param('id') id: number) {
    return this.spellService.getOne(characterId, id);
  }

  @Post()
  create(@Param('characterId') characterId: number, @Body() dto: CreateSpellDto) {
    return this.spellService.create(characterId, dto);
  }

  @Patch(':id')
  update(
    @Param('characterId') characterId: number,
    @Param('id') id: number,
    @Body() dto: UpdateSpellDto,
  ) {
    return this.spellService.update(characterId, id, dto);
  }

  @Delete(':id')
  remove(@Param('characterId') characterId: number, @Param('id') id: number) {
    return this.spellService.remove(characterId, id);
  }
}
