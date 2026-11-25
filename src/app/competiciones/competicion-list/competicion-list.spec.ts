import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompeticionList } from './competicion-list';

describe('CompeticionList', () => {
  let component: CompeticionList;
  let fixture: ComponentFixture<CompeticionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompeticionList],
    }).compileComponents();

    fixture = TestBed.createComponent(CompeticionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
