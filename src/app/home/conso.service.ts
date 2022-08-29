import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conso } from './conso';

@Injectable({
  providedIn: 'root'
})
export class ConsoService {

  ApiPHP = 'https://le-esp.fr/CRM/';

  constructor(private httpClient: HttpClient) { }

  getConso(): Observable<Conso[]> {
    return this.httpClient.get<Conso[]>(`${this.ApiPHP}/ReadFood.php`);
  }
}
