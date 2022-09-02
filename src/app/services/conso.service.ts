import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conso } from '../modele/conso';

@Injectable({
  providedIn: 'root'
})
export class ConsoService {

  ApiPHP = 'https://le-esp.fr/PET';

  constructor(private httpClient: HttpClient) { }

  getConso(): Observable<Conso[]> {
    return this.httpClient.get<Conso[]>(`${this.ApiPHP}/ReadFood.php`);
  }

  createConso(job: Conso): Observable<Conso> {
    return this.httpClient.post<Conso>(`${this.ApiPHP}/Create_Food.php`, job);
  }

}
