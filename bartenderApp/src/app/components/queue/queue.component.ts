
import { Component, OnInit } from '@angular/core';
import { CocktailServiceService } from '../../services/cocktail-service.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  orders: Order[] = [];

  constructor(private cocktailService: CocktailServiceService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.cocktailService.getOrders().subscribe(
      (data: Order[]) => {
        console.log('Orders fetched:', data); // Log fetched orders
        this.orders = data;
      },
      (error: any) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  completeOrder(orderId: number): void {
    this.cocktailService.completeOrder(orderId).subscribe(
      () => {
        this.orders = this.orders.filter(order => order.id !== orderId);
        alert(`Order ${orderId} is complete`);
      },
      (error: any) => console.error('Error completing order', error)
    );
  }
}
