import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RadioComponent } from "app/shared/radio/radio.component";
import { SharedModule } from "app/shared/shared.module";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { OrderItensComponent } from "./order-itens/order-itens.component";
import { OrderComponent } from "./order.component";

const ROUTES: Routes = [
    { path: '', component: OrderComponent },

]

@NgModule({
    declarations: [OrderComponent, OrderItensComponent,
        DeliveryCostsComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})



export class OrderModule { }