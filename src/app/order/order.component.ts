import { Component, OnInit} from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';



@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  orderForm: FormGroup
  delivery: number = 8
  paymentOptions: RadioOption[]= [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartao de Debito', value: 'DEB'},
    {label: 'Cartao Refeicao', value: 'REF'}
  ]

  constructor(private orderService: OrderService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      name: this.fb.control('',[Validators.required, Validators.minLength(5)]),
      email: this.fb.control('',[Validators.required,Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.fb.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.fb.control('',[Validators.required, Validators.minLength(5)]),
      number: this.fb.control('',[Validators.required, Validators.pattern(this.numberPattern)]),
      optional: this.fb.control(''),
      paymentOption: this.fb.control('', [Validators.required])

    }, {validator: OrderComponent.equalsTo})
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean}{
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if(!email || !emailConfirmation){
      return undefined
    }
    if(email.value !== emailConfirmation.value){
      return{emailsNotMatch:true}
    }
    return undefined
  }

  itemsValue(): number{
    return this.orderService.itemsValue()
  }
  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems().map((item:CartItem)=>new OrderItem(item.qtd, item.menuItem.id))
    this.orderService.checkOrder(order).subscribe((orderId: string)=> {
      this.router.navigate(['/order-summary'])
      this.orderService.clear()
    })
    
  }


}
