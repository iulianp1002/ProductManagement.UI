import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../products/product';
import { environment } from '../environments/environment';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private url = "Store";

  public myBehaviorSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  public getStores(): Observable<Store[]> {

    return this.http.get<Store[]>(`${environment.apiURL}/${this.url}/StoreList`).pipe(
      tap((data) => { 
      
        this.myBehaviorSubject.next(data.length);
      }))

  }

  public updateStore(store: Store): Observable<number> {
    return this.http.put<number>(`${environment.apiURL}/${this.url}`, store)
  }

  public createStore(store: Store): Observable<number> {

    return this.http.post<number>(`${environment.apiURL}/${this.url}`, store)
  }

  public deleteStore(code: string): Observable<number> {
    return this.http.delete<number>(`${environment.apiURL}/${this.url}/?code=${code}`)
  }

  public getStore(code: string): Observable<number> {
    return this.http.get<number>(`${environment.apiURL}/${this.url}/?code=${code}`)
  }
}
