import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../modele/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  ApiPHP = 'https://le-esp.fr/PET';

  constructor(private httpClient: HttpClient) { }

  getPet(): Observable<Pet[]> {
    return this.httpClient.get<Pet[]>(`${this.ApiPHP}/Pet/Read_Pet.php`);
  }
  
}
