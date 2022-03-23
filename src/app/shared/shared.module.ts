import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderService } from "app/order/order.service";
import { ShoppinCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantService } from "app/restaurants/service";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from "./messages/notification.service";
import { LoginService } from "app/security/login/login.service";
import { LoggedInGuard } from "app/security/loggedin.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "app/security/auth.interceptor";
import { ContactComponent } from "app/contact/contact.component";
import { ContactService } from "app/contact/contact.service";


@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent, ContactComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    exports: [FormsModule, ReactiveFormsModule, CommonModule,
        InputComponent, RadioComponent, RatingComponent, SnackbarComponent]
})

export class SharedModule {
    static foRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ LoggedInGuard, LoginService, ShoppinCartService, OrderService, RestaurantService, NotificationService, ContactService,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
        }
    }
}