import { Component, ChangeDetectorRef, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Auto, AutoData } from '../auto-data';
import { Competicion, CompeticionData } from '../../competiciones/competicion-data';
import { coincide, normalizar } from '../../shared/busqueda';

type CampoOrden = 'modelo' | 'marca' | 'numero' | 'potencia' | 'piloto' | 'categoria' | 'competicion';

@Component({
  selector: 'app-auto-list',
  standalone: false,
  templateUrl: './auto-list.html',
  styleUrl: './auto-list.css',
})
export class AutoList implements OnInit {
  autos: Auto[] = [];
  competiciones: Competicion[] = [];
  competicionFiltroId: number | null = null;
  busqueda = '';
  ordenarPorCampo: CampoOrden = 'modelo';
  ascendente = true;
  confirmandoBorrado: number | null = null;
  actualizando = false;
  cargando = true;
  error: string | null = null;

  constructor(
    private autoData: AutoData,
    private competicionData: CompeticionData,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}

  get nombreCompeticionFiltro(): string {
    if (this.competicionFiltroId === null) {
      return '';
    }

    return (
      this.competiciones.find((c) => c.id === this.competicionFiltroId)?.nombre ??
      `ID ${this.competicionFiltroId}`
    );
  }

  get autosFiltrados(): Auto[] {
    const filtrados = this.autos.filter((auto) => {
      // El backend serializa la relación como `competicion`, no como `competicionId`.
      const idCompeticion = auto.competicion?.id ?? auto.competicionId;
      if (this.competicionFiltroId !== null && idCompeticion !== this.competicionFiltroId) {
        return false;
      }

      return coincide(this.busqueda, [
        auto.modelo,
        auto.marca,
        auto.numero,
        auto.piloto,
        auto.categoria,
        auto.competicion?.nombre,
      ]);
    });

    return [...filtrados].sort((a, b) => {
      const valorA = this.valorOrden(a);
      const valorB = this.valorOrden(b);
      const resultado =
        typeof valorA === 'number' && typeof valorB === 'number'
          ? valorA - valorB
          : normalizar(valorA).localeCompare(normalizar(valorB));
      return this.ascendente ? resultado : -resultado;
    });
  }

  get hayFiltros(): boolean {
    return this.busqueda.trim().length > 0 || this.competicionFiltroId !== null;
  }

  ngOnInit(): void {
    // Ejemplo: /autos?competicion=3 -> sólo los autos de esa competición.
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const valor = params.get('competicion');
        const id = valor === null ? NaN : Number(valor);
        this.competicionFiltroId = Number.isInteger(id) && id > 0 ? id : null;
        this.cdr.markForCheck();
      });

    this.cargarCompeticiones();
    this.cargar();
  }

  private valorOrden(auto: Auto): string | number {
    const campo = this.ordenarPorCampo;
    if (campo === 'competicion') {
      return auto.competicion?.nombre ?? '';
    }
    return auto[campo];
  }

  private cargarCompeticiones(): void {
    this.competicionData.getAll().subscribe({
      next: (data) => {
        this.competiciones = data;
        this.cdr.markForCheck();
      },
      error: () => {
        // Si falla este GET igual se pueden listar autos; el nombre cae al ID.
        this.cdr.markForCheck();
      },
    });
  }

  private cargar(mostrarEstado = false): void {
    if (mostrarEstado) {
      this.actualizando = true;
      this.error = null;
      this.cdr.markForCheck();
    }

    this.autoData.getAll().subscribe({
      next: (data) => {
        this.autos = data;
        this.cargando = false;
        this.actualizando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudieron cargar los autos. Intentá de nuevo en unos segundos.';
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

  quitarFiltroCompeticion(): void {
    this.router.navigate(['/autos'], { queryParams: {} });
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
    this.autoData.remove(id).subscribe({
      next: () => {
        this.autos = this.autos.filter((a) => a.id !== id);
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudo borrar el auto.';
        this.cdr.markForCheck();
      },
    });
  }
}
