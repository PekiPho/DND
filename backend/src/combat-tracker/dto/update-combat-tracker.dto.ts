import { PartialType } from '@nestjs/mapped-types';
import { CreateCombatTrackerDto } from './create-combat-tracker.dto';

export class UpdateCombatTrackerDto extends PartialType(CreateCombatTrackerDto) {}
