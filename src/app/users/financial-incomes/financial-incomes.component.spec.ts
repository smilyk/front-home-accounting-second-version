import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialIncomesComponent } from './financial-incomes.component';

describe('FinancialIncomesComponent', () => {
  let component: FinancialIncomesComponent;
  let fixture: ComponentFixture<FinancialIncomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialIncomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
