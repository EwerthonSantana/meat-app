import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MEAT_API } from "app/app.api";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { ShoppinCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Order, OrderItem } from "./order.model";


@Injectable()
export class OrderService {


    constructor(private cartService: ShoppinCartService,
        private http: HttpClient) { }


    clear() {
        this.cartService.clear()
    }

    itemsValue(): number {
        return this.cartService.total()      
    }

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    checkOrder(order: Order): Observable<string> {


        return this.http.post<Order>(`${MEAT_API}/orders`, order)
            .pipe(map(order => order.id))
            
    }
}       