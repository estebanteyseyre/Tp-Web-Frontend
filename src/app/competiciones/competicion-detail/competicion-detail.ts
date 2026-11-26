import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competicion, CompeticionData } from '../competicion-data';

@Component({
  selector: 'app-competicion-detail',
  standalone: false,
  templateUrl: './competicion-detail.html',
  styleUrl: './competicion-detail.css',
})
export class CompeticionDetail implements OnInit {
  competicion: Competicion | null = null;
  cargando = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private competicionData: CompeticionData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || !Number.isInteger(id)) {
      this.error = 'No se encontró la competición solicitada.';
      this.cargando = false;
      this.cdr.markForCheck();
      return;
    }

    // findOne del backend carga la relación con TypeORM (relations: { autos: true }).
    this.competicionData.getById(id).subscribe({
      next: (data) => {
        this.competicion = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudo cargar el detalle. Intentá de nuevo en unos segundos.';
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });
  }
}
