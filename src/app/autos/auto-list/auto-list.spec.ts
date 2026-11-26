import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, RouterModule } from '@angular/router';
import { AutoList } from './auto-list';

describe('AutoList', () => {
  let component: AutoList;
  let fixture: ComponentFixture<AutoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, RouterModule],
      declarations: [AutoList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filtra los autos por competición y por texto', () => {
    component.autos = [
      {
        id: 1,
        modelo: 'Ferrari SF-23',
        marca: 'Ferrari',
        numero: 16,
        potencia: 1000,
        piloto: 'Charles Leclerc',
        categoria: 'F1',
        competicionId: 1,
        competicion: { id: 1, nombre: 'Mónaco', premio: '1', fecha: '2026-05-25', lugar: 'Mónaco' },
      },
      {
        id: 2,
        modelo: 'Red Bull RB19',
        marca: 'Red Bull',
        numero: 1,
        potencia: 1000,
        piloto: 'Max Verstappen',
        categoria: 'F1',
        competicionId: 2,
      },
    ];

    component.competicionFiltroId = 1;
    expect(component.autosFiltrados.map((a) => a.id)).toEqual([1]);
    expect(component.nombreCompeticionFiltro).toBe('ID 1');

    component.competiciones = [
      { id: 1, nombre: 'Gran Premio de Mónaco', premio: '1', fecha: '2026-05-25', lugar: 'Mónaco' },
    ];
    expect(component.nombreCompeticionFiltro).toBe('Gran Premio de Mónaco');

    component.busqueda = 'leclerc';
    expect(component.autosFiltrados.map((a) => a.id)).toEqual([1]);

    component.busqueda = 'red bull';
    expect(component.autosFiltrados.length).toBe(0);

    component.competicionFiltroId = null;
    component.busqueda = 'monaco';
    expect(component.autosFiltrados.map((a) => a.id)).toEqual([1]);
  });

  it('filtra cuando la API devuelve la competición como objeto sin competicionId', () => {
    component.autos = [
      {
        id: 3,
        modelo: 'Ferrari',
        marca: 'Ferrari',
        numero: 16,
        potencia: 1000,
        piloto: 'Leclerc',
        categoria: 'F1',
        competicion: { id: 4, nombre: 'imola', premio: '5000', fecha: '2026-01-01', lugar: 'italia' },
      },
    ];

    component.competicionFiltroId = 4;
    expect(component.autosFiltrados.map((a) => a.id)).toEqual([3]);

    component.competicionFiltroId = 2;
    expect(component.autosFiltrados.length).toBe(0);
  });

  it('ordena por número y pide confirmación antes de borrar', () => {
    component.autos = [
      {
        id: 1, modelo: 'B', marca: 'B', numero: 22, potencia: 1,
        piloto: 'B', categoria: 'F1', competicionId: 1,
      },
      {
        id: 2, modelo: 'A', marca: 'A', numero: 7, potencia: 1,
        piloto: 'A', categoria: 'F1', competicionId: 1,
      },
    ];

    component.ordenar('numero');
    expect(component.autosFiltrados.map((a) => a.id)).toEqual([2, 1]);

    component.ordenar('numero');
    expect(component.autosFiltrados.map((a) => a.id)).toEqual([1, 2]);

    component.pedirBorrar(2);
    expect(component.confirmandoBorrado).toBe(2);
    component.cancelarBorrar();
    expect(component.confirmandoBorrado).toBeNull();
  });
});
