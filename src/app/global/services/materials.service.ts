import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../interfaces/material.interface';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  private apiURL = environment.apiUrl + '/material';
  constructor(private http: HttpClient) { }

  getMaterials(): Observable<Material[]>{
      return this.http.get<Material[]>(this.apiURL + '/all');
  }

  addMaterial(material: Material): Observable<Material>{
      return this.http.post<Material>(this.apiURL, material);
  }

  updateMaterial(material: Material): Observable<Material>{
    return this.http.put<Material>(this.apiURL, material);
  }

  deleteMaterial(id: number): Observable<unknown>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.delete<Material>(url);
  }
}
