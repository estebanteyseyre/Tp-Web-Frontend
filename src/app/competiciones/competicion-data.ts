import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AutoResumen {
  id: number;
  modelo: string;
}

export interface CompeticionInput {
  nombre: string;
  premio: string;
  fecha: string;
  lugar: string;
}

export interface Competicion extends CompeticionInput {
  id: number;
  autos?: AutoResumen[];
}

@Injectable({
  providedIn: 'root',
})
export class CompeticionData {
  private url = `${environment.apiUrl}/competiciones`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Competicion[]> {
    return this.http.get<Competicion[]>(this.url);
  }

  getById(id: number): Observable<Competicion> {
    return this.http.get<Competicion>(`${this.url}/${id}`);
  }

  create(competicion: CompeticionInput): Observable<Competicion> {
    return this.http.post<Competicion>(this.url, competicion);
  }

  update(id: number, competicion: CompeticionInput): Observable<Competicion> {
    return this.http.patch<Competicion>(`${this.url}/${id}`, competicion);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
