import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login/login.service";

@Injectable()

export class LoggedInGuard implements CanLoad, CanActivate {

    checkAuthentication(path: string): boolean {

        const loggedIn = this.loginService.isLoggedIn()
        if (!loggedIn) {
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn

    }

    constructor(private loginService: LoginService) { }

    canLoad(route: Route): boolean {
        // console.log('canLoad')
        return this.checkAuthentication(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        console.log('CanActivate')
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }
}