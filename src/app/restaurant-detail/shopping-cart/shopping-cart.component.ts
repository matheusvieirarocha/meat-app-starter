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

  clear(){
    this.shoppingcartService.clear()
  }
  items(): any[]{
    return this.shoppingcartService.items
  }
  removeItem(item:any){
    this.shoppingcartService.removeItem(item)
  }
  addItem(item:any){
    this.shoppingcartService.addItem(item)
  }
  total(): number{
    return this.shoppingcartService.total()
  }
}
