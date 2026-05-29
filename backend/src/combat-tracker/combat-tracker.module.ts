import { Module } from '@nestjs/common';
import { CombatTrackerService } from './combat-tracker.service';
import { CombatTrackerController } from './combat-tracker.controller';

@Module({
  controllers: [CombatTrackerController],
  providers: [CombatTrackerService],
})
export class CombatTrackerModule {}
