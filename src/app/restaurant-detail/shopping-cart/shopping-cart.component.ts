import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart-service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingcartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any[]{
    return this.shoppingcartService.items
  }

  total(): number{
    return this.shoppingcartService.total()
  }
}
