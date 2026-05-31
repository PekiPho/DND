import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Spell } from './entities/spell.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpellService {
  
  constructor(
    @InjectRepository(Spell)
    private spellRepo: Repository<Spell>,
  ) {}

  async getAll(characterId: number) {
    return this.spellRepo.find({
      where: { character: { id: characterId } },
    });
  }

  async getOne(characterId: number, id: number) {
    const spell = await this.spellRepo.findOne({
      where: { id, character: { id: characterId } },
    });
    if (!spell) throw new NotFoundException('Spell not found');
    return spell;
  }

  async create(characterId: number, dto: CreateSpellDto) {
    const spell = this.spellRepo.create({
      ...dto,
      character: { id: characterId },
    });
    return this.spellRepo.save(spell);
  }

  async update(characterId: number, id: number, dto: UpdateSpellDto) {
    const spell = await this.getOne(characterId, id);
    Object.assign(spell, dto);
    return this.spellRepo.save(spell);
  }

  async remove(characterId: number, id: number) {
    const spell = await this.getOne(characterId, id);
    return this.spellRepo.remove(spell);
  }
}
