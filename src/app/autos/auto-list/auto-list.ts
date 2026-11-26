import { Component, ChangeDetectorRef, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Auto, AutoData } from '../auto-data';
import { Competicion, CompeticionData } from '../../competiciones/competicion-data';
import { coincide } from '../../shared/busqueda';

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
    return this.autos.filter((auto) => {
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

    this.autoData.getAll().subscribe({
      next: (data) => {
        this.autos = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudieron cargar los autos. Intentá de nuevo en unos segundos.';
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });
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

  borrar(id: number): void {
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
