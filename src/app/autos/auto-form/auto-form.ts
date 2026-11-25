import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { AutoData, AutoInput } from '../auto-data';
import { Competicion, CompeticionData } from '../../competiciones/competicion-data';

@Component({
  selector: 'app-auto-form',
  standalone: false,
  templateUrl: './auto-form.html',
  styleUrl: './auto-form.css',
})
export class AutoForm implements OnInit {
  auto: AutoInput = {
    modelo: '',
    marca: '',
    numero: 0,
    potencia: 0,
    piloto: '',
    categoria: '',
    competicionId: 0,
  };

  competiciones: Competicion[] = [];
  id: number | null = null;
  cargando = true;
  guardando = false;
  error: string | null = null;

  constructor(
    private autoData: AutoData,
    private competicionData: CompeticionData,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const auto$ = idParam ? this.autoData.getById(Number(idParam)) : of(null);
    if (idParam) {
      this.id = Number(idParam);
    }

    forkJoin({
      competiciones: this.competicionData.getAll(),
      auto: auto$,
    }).subscribe({
      next: ({ competiciones, auto }) => {
        this.competiciones = competiciones;
        if (auto) {
          this.auto = {
            modelo: auto.modelo,
            marca: auto.marca,
            numero: auto.numero,
            potencia: auto.potencia,
            piloto: auto.piloto,
            categoria: auto.categoria,
            competicionId: auto.competicion?.id ?? 0,
          };
        }
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudo cargar el formulario. Revisá la conexión con el backend.';
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });
  }

  get esEdicion(): boolean {
    return this.id !== null;
  }

  guardar(): void {
    this.error = null;

    if (this.auto.competicionId === 0) {
      this.error = 'Elegí una competición para el auto.';
      this.cdr.markForCheck();
      return;
    }

    this.guardando = true;
    const peticion = this.esEdicion
      ? this.autoData.update(this.id!, this.auto)
      : this.autoData.create(this.auto);

    peticion.subscribe({
      next: () => this.router.navigate(['/autos']),
      error: () => {
        this.error = this.esEdicion
          ? 'No se pudo guardar el auto.'
          : 'No se pudo crear el auto.';
        this.guardando = false;
        this.cdr.markForCheck();
      },
    });
  }
}
