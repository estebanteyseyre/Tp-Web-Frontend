import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompeticionData, CompeticionInput } from '../competicion-data';

@Component({
  selector: 'app-competicion-form',
  standalone: false,
  templateUrl: './competicion-form.html',
  styleUrl: './competicion-form.css',
})
export class CompeticionForm {
  nuevaCompeticion: CompeticionInput = {
    nombre: '',
    premio: '',
    fecha: '',
    lugar: '',
  };

  constructor(
    private competicionData: CompeticionData,
    private router: Router
  ) {}

  guardar(): void {
    this.competicionData.create(this.nuevaCompeticion).subscribe(() => {
      this.router.navigate(['/competiciones']);
    });
  }
}
