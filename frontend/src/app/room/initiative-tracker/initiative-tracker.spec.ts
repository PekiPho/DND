import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeTracker } from './initiative-tracker';

describe('InitiativeTracker', () => {
  let component: InitiativeTracker;
  let fixture: ComponentFixture<InitiativeTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiativeTracker],
    }).compileComponents();

    fixture = TestBed.createComponent(InitiativeTracker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
