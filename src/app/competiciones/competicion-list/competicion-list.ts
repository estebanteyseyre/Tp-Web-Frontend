import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Competicion, CompeticionData } from '../competicion-data';

@Component({
  selector: 'app-competicion-list',
  standalone: false,
  templateUrl: './competicion-list.html',
  styleUrl: './competicion-list.css',
})
export class CompeticionList implements OnInit {
  competiciones: Competicion[] = [];
  cargando = true;
  error: string | null = null;

  constructor(
    private competicionData: CompeticionData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.competicionData.getAll().subscribe({
      next: (data) => {
        this.competiciones = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudieron cargar las competiciones. Intentá de nuevo en unos segundos.';
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });
  }

  borrar(id: number): void {
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
