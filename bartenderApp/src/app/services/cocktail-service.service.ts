
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktail } from '../models/cocktail';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CocktailServiceService {
  private apiUrl = 'http://localhost:3000'; // Ensure this URL matches your Express server URL

  constructor(private http: HttpClient) {}

  getMenu(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(`${this.apiUrl}/menu`);
  }

  addOrder(cocktailName: string): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, { cocktail: cocktailName });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  completeOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/${orderId}`);
  }

}
