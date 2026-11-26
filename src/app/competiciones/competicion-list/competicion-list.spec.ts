import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, RouterModule } from '@angular/router';
import { CompeticionList } from './competicion-list';

describe('CompeticionList', () => {
  let component: CompeticionList;
  let fixture: ComponentFixture<CompeticionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, RouterModule],
      declarations: [CompeticionList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CompeticionList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filtra por nombre sin importar tildes ni mayúsculas', () => {
    component.competiciones = [
      { id: 1, nombre: 'Gran Premio de Mónaco', premio: '1', fecha: '2026-05-25', lugar: 'Mónaco' },
      { id: 2, nombre: 'París Cup', premio: '2', fecha: '2026-06-01', lugar: 'Francia' },
    ];

    component.busqueda = 'paris';
    expect(component.competicionesFiltradas.map((c) => c.id)).toEqual([2]);

    component.busqueda = 'mónaco';
    expect(component.competicionesFiltradas.map((c) => c.id)).toEqual([1]);

    component.limpiarBusqueda();
    expect(component.competicionesFiltradas.length).toBe(2);
  });

  it('ordena por cantidad de autos y permite invertir el sentido', () => {
    component.competiciones = [
      { id: 1, nombre: 'Con autos', premio: '1', fecha: '2026-01-01', lugar: 'A', autos: [{ id: 9, modelo: 'Auto' }] },
      { id: 2, nombre: 'Sin autos', premio: '2', fecha: '2026-01-02', lugar: 'B', autos: [] },
    ];

    component.ordenar('autos');
    expect(component.competicionesFiltradas.map((c) => c.id)).toEqual([2, 1]);
    expect(component.flecha('autos')).toBe(' ▲');

    component.ordenar('autos');
    expect(component.competicionesFiltradas.map((c) => c.id)).toEqual([1, 2]);
    expect(component.flecha('autos')).toBe(' ▼');
  });

  it('pide confirmación antes de borrar', () => {
    component.pedirBorrar(5);
    expect(component.confirmandoBorrado).toBe(5);

    component.cancelarBorrar();
    expect(component.confirmandoBorrado).toBeNull();
  });
});
