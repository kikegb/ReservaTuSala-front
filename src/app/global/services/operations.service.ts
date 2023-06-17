import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operation } from 'src/app/global/interfaces/operation.interface';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private apiURL = environment.apiUrl + '/operation';
  constructor(private http: HttpClient) { }

  getOperations(): Observable<Operation[]>{
    return this.http.get<Operation[]>(this.apiURL + '/all').pipe(
      map(operations => operations.map(operation => ({
        ...operation,
        start: new Date(operation.start),
        end: new Date(operation.end)
      })))
    );
  }

  addOperation(operation: Operation): Observable<Operation>{
      const formattedOperation = {
        ...operation,
        start: operation.start.toISOString().slice(0, -2),
        end: operation.end.toISOString().slice(0, -2)
      };
      return this.http.post<Operation>(this.apiURL, formattedOperation);
  }

  updateOperation(operation: Operation): Observable<Operation>{
    const formattedOperation = {
      ...operation,
      start: operation.start.toISOString().slice(0, -2),
      end: operation.end.toISOString().slice(0, -2),
      customer: {id: operation.customer.id},
      business: {id: operation.business.id},
      room: {id: operation.room.id}
    };
    return this.http.put<Operation>(this.apiURL, formattedOperation);
  }

  deleteOperation(id: number): Observable<unknown>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.delete<Operation>(url);
  }
}
