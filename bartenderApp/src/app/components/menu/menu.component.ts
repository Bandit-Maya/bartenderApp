import { Component,OnInit } from '@angular/core';
import { CocktailServiceService } from '../../services/cocktail-service.service';
import { Cocktail } from '../../models/cocktail';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  menu: Cocktail[] = [];
  selectedCocktail: string = '';

  constructor(private cocktailService: CocktailServiceService,private router:Router) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    this.cocktailService.getMenu().subscribe(
      (data: Cocktail[]) => this.menu = data,
      (error) => console.error('Error fetching menu', error)
    );
  }

  placeOrder(): void {
    if (this.selectedCocktail) {
      this.cocktailService.addOrder(this.selectedCocktail).subscribe(
        () => {
          alert(`Order for ${this.selectedCocktail} has been placed`);
          this.selectedCocktail = '';
          window.location.reload();
        },
        (error) => console.error('Error placing order', error)
      );
    } else {
      alert('Please select a cocktail');
    }
  }
}
