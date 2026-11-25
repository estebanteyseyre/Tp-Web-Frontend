import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Competicion, CompeticionData } from '../competicion-data';

@Component({
  selector: 'app-competicion-list',
  standalone: false,
  templateUrl: './competicion-list.html',
  styleUrl: './competicion-list.css',
})
export class CompeticionList implements OnInit {
  competiciones: Competicion[] = [];

  constructor(
    private competicionData: CompeticionData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.competicionData.getAll().subscribe((data) => {
      this.competiciones = data;
      this.cdr.markForCheck();
    });
  }

  borrar(id: number): void {
    this.competicionData.remove(id).subscribe(() => {
      this.competiciones = this.competiciones.filter((c) => c.id !== id);
      this.cdr.markForCheck();
    });
  }
}
