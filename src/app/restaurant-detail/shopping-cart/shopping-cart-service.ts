import { CartItem } from "./cart-item.model"
import { MenuItem } from "../menu-item/menu-item.model"

export class ShoppingCartService {
    items: CartItem[] = []

    clear(){
        this.items = []
    }


    addItem(item : MenuItem){
        let foundItem = this.items.find((mItem)=>mItem.menuItem.id === item.id)
        if(foundItem){
            this.increaseQty(foundItem)
        }else{
            this.items.push(new CartItem(item))
        }
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
    }

    increaseQty(item: CartItem){
        item.qtd = item.qtd + 1
    }

    decreaseQty(item: CartItem){
        item.qtd -= 1
        if(item.qtd === 0){
            this.removeItem(item)
        }
    }

    total(): number{
        return this.items.map(item => item.value()).reduce((prev, value)=> prev+value, 0)
    }


}