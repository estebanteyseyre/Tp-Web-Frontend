import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Competicion, CompeticionData } from '../competicion-data';
import { coincide, normalizar } from '../../shared/busqueda';

type CampoOrden = 'nombre' | 'premio' | 'fecha' | 'lugar' | 'autos';

@Component({
  selector: 'app-competicion-list',
  standalone: false,
  templateUrl: './competicion-list.html',
  styleUrl: './competicion-list.css',
})
export class CompeticionList implements OnInit {
  competiciones: Competicion[] = [];
  busqueda = '';
  ordenarPorCampo: CampoOrden = 'nombre';
  ascendente = true;
  confirmandoBorrado: number | null = null;
  actualizando = false;
  cargando = true;
  error: string | null = null;

  constructor(
    private competicionData: CompeticionData,
    private cdr: ChangeDetectorRef
  ) {}

  get competicionesFiltradas(): Competicion[] {
    const filtradas = this.competiciones.filter((c) =>
      coincide(this.busqueda, [c.nombre, c.premio, c.fecha, c.lugar])
    );

    return [...filtradas].sort((a, b) => {
      const valorA = this.valorOrden(a);
      const valorB = this.valorOrden(b);
      const resultado =
        typeof valorA === 'number' && typeof valorB === 'number'
          ? valorA - valorB
          : normalizar(valorA).localeCompare(normalizar(valorB));
      return this.ascendente ? resultado : -resultado;
    });
  }

  ngOnInit(): void {
    this.cargar();
  }

  private valorOrden(c: Competicion): string | number {
    const campo = this.ordenarPorCampo;
    if (campo === 'autos') {
      return c.autos?.length ?? 0;
    }
    return c[campo];
  }

  private cargar(mostrarEstado = false): void {
    if (mostrarEstado) {
      this.actualizando = true;
      this.error = null;
      this.cdr.markForCheck();
    }

    this.competicionData.getAll().subscribe({
      next: (data) => {
        this.competiciones = data;
        this.cargando = false;
        this.actualizando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudieron cargar las competiciones. Intentá de nuevo en unos segundos.';
        this.cargando = false;
        this.actualizando = false;
        this.cdr.markForCheck();
      },
    });
  }

  recargar(): void {
    this.cargar(true);
  }

  ordenar(campo: CampoOrden): void {
    if (this.ordenarPorCampo === campo) {
      this.ascendente = !this.ascendente;
    } else {
      this.ordenarPorCampo = campo;
      this.ascendente = true;
    }
    this.cdr.markForCheck();
  }

  flecha(campo: CampoOrden): string {
    return this.ordenarPorCampo === campo ? (this.ascendente ? ' ▲' : ' ▼') : '';
  }

  alCambiarBusqueda(): void {
    this.cdr.markForCheck();
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
    this.cdr.markForCheck();
  }

  pedirBorrar(id: number): void {
    this.confirmandoBorrado = id;
    this.cdr.markForCheck();
  }

  cancelarBorrar(): void {
    this.confirmandoBorrado = null;
    this.cdr.markForCheck();
  }

  confirmarBorrar(): void {
    const id = this.confirmandoBorrado;
    if (id === null) {
      return;
    }
    this.confirmandoBorrado = null;
    this.borrar(id);
  }

  private borrar(id: number): void {
    this.competicionData.remove(id).subscribe({
      next: () => {
        this.competiciones = this.competiciones.filter((c) => c.id !== id);
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudo borrar la competición.';
        this.cdr.markForCheck();
      },
    });
  }
}
