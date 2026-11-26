import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Competicion } from '../competiciones/competicion-data';

export interface AutoInput {
  modelo: string;
  marca: string;
  numero: number;
  potencia: number;
  piloto: string;
  categoria: string;
  competicionId: number;
}

// La API devuelve la competición como objeto; no siempre incluye competicionId.
export interface Auto extends Omit<AutoInput, 'competicionId'> {
  id: number;
  competicionId?: number;
  competicion?: Competicion;
}

@Injectable({
  providedIn: 'root',
})
export class AutoData {
  private url = `${environment.apiUrl}/autos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.url);
  }

  getById(id: number): Observable<Auto> {
    return this.http.get<Auto>(`${this.url}/${id}`);
  }

  create(auto: AutoInput): Observable<Auto> {
    return this.http.post<Auto>(this.url, auto);
  }

  update(id: number, auto: AutoInput): Observable<Auto> {
    return this.http.patch<Auto>(`${this.url}/${id}`, auto);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
