import { ValueTransformer } from "@angular/compiler/src/util"
import { Injectable } from "@angular/core"
import { NotificationService } from "app/shared/messages/notification.service"
import { MenuItemComponent } from "../menu-item/menu-item.component"
import { MenuItem } from "../menu-item/menu-item.model"
import { CartItem } from "./cart-item.model"

@Injectable()
export class ShoppinCartService {
    items: CartItem[] = []

    constructor(private notificationService: NotificationService){

    }

    clear() {
        this.items = []

    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
        if (foundItem) {
        this.increaseQty(foundItem)
        } else {
            this.items.push(new CartItem(item))
        }
        this.notificationService.notify(`Você adicionou um item ${item.name}`)
    }

    decreaseQty(item: CartItem){
    item.quantity --
    if(item.quantity === 0){
        this.removeItem(item)
    }
    }

    increaseQty(item: CartItem){
        item.quantity ++
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify(`Você removeu um item ${item.menuItem.name}`)

    }

    total(): number {
        return this.items.map(item => item.value()).reduce((prev, value) => prev + value, 0)
    }
}