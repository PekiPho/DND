import { Test, TestingModule } from '@nestjs/testing';
import { CombatTrackerController } from './combat-tracker.controller';
import { CombatTrackerService } from './combat-tracker.service';

describe('CombatTrackerController', () => {
  let controller: CombatTrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombatTrackerController],
      providers: [CombatTrackerService],
    }).compile();

    controller = module.get<CombatTrackerController>(CombatTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
