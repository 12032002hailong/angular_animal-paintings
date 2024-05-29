import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatListModule, NgFor],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data
      this.totalPrice = this.getTotalPrice();
    })
  }

  getTotalPrice(): number {
    let total = 0;
    this.cartItems.map(
      item => {
        return (
          total += item.price
        )
      }
    )
    return total
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe();
  }

  checkOut(): void {
    this.cartService.checkout(this.cartItems).subscribe();
  }

}
