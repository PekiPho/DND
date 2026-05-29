import { Test, TestingModule } from '@nestjs/testing';
import { CombatTrackerService } from './combat-tracker.service';

describe('CombatTrackerService', () => {
  let service: CombatTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombatTrackerService],
    }).compile();

    service = module.get<CombatTrackerService>(CombatTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
