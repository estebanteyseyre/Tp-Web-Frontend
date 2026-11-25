import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CompeticionData } from './competicion-data';

describe('CompeticionData', () => {
  let service: CompeticionData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CompeticionData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});