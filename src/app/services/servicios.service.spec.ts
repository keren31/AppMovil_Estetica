import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiciosService } from './servicios.service';

describe('ServiciosService', () => {
  let service: ServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Agrega HttpClientTestingModule aquí
      providers: [ServiciosService]
    });
    service = TestBed.inject(ServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
