import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "Product";

  public myProductBehaviorSubject = new BehaviorSubject<any>(null);  

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(`${environment.apiURL}/${this.url}/ProductList`).pipe(
      tap((data) => {

        this.myProductBehaviorSubject.next(data.length);
      }))

  }

  public updateProduct(product: Product): Observable<number> {
    return this.http.put<number>(`${environment.apiURL}/${this.url}`, product)
  }

  public createProduct(product: Product): Observable<number> {

    return this.http.post<number>(`${environment.apiURL}/${this.url}`, product)
  }

  public deleteProduct(codIdx: string, codIdxAlt: string): Observable<number> {
    return this.http.delete<number>(`${environment.apiURL}/${this.url}/?codIdx=${codIdx}&codIdxAlt=${codIdxAlt}`)
  }

  public getProduct(codIdx: string, codIdxAlt: string): Observable<number> {
    return this.http.get<number>(`${environment.apiURL}/${this.url}/?codIdx=${codIdx}&codIdxAlt=${codIdxAlt}`)
  }
}
