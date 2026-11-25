import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Auto, AutoData } from '../auto-data';

@Component({
  selector: 'app-auto-list',
  standalone: false,
  templateUrl: './auto-list.html',
  styleUrl: './auto-list.css',
})
export class AutoList implements OnInit {
  autos: Auto[] = [];
  cargando = true;
  error: string | null = null;

  constructor(
    private autoData: AutoData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
