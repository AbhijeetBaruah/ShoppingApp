import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService:AuthService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    //here we are not avoiding subscription as we cannot unsubscribe it later,
    //so the map operator will subscribe and unsubscribe it own its own and will return a boolean
    return this.authService.getUser().pipe(
      map(user=>{
        if(user) return true;
  
        this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}})
        return false;
      })
    )
  }
  
}
