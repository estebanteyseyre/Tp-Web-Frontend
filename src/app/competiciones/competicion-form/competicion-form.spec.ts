import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompeticionForm } from './competicion-form';

describe('CompeticionForm', () => {
  let component: CompeticionForm;
  let fixture: ComponentFixture<CompeticionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompeticionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CompeticionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
