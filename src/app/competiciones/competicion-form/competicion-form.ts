import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompeticionData, CompeticionInput } from '../competicion-data';

@Component({
  selector: 'app-competicion-form',
  standalone: false,
  templateUrl: './competicion-form.html',
  styleUrl: './competicion-form.css',
})
export class CompeticionForm implements OnInit {
  competicion: CompeticionInput = {
    nombre: '',
    premio: '',
    fecha: '',
    lugar: '',
  };

  id: number | null = null;
  error: string | null = null;
  guardando = false;

  constructor(
    private competicionData: CompeticionData,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.competicionData.getById(this.id).subscribe({
        next: (data) => {
          this.competicion = {
            nombre: data.nombre,
            premio: data.premio,
            fecha: data.fecha,
            lugar: data.lugar,
          };
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'No se pudo cargar la competición para editar.';
          this.cdr.markForCheck();
        },
      });
    }
  }

  get esEdicion(): boolean {
    return this.id !== null;
  }

  guardar(): void {
    this.error = null;
    this.guardando = true;

    const peticion = this.esEdicion
      ? this.competicionData.update(this.id!, this.competicion)
      : this.competicionData.create(this.competicion);

    peticion.subscribe({
      next: () => this.router.navigate(['/competiciones']),
      error: () => {
        this.error = this.esEdicion
          ? 'No se pudo guardar la competición.'
          : 'No se pudo crear la competición.';
        this.guardando = false;
        this.cdr.markForCheck();
      },
    });
  }
}
