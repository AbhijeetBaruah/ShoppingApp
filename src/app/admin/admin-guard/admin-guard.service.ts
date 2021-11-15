import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service/auth.service';

import { filter, map, switchMap, switchMapTo } from 'rxjs/operators'
import { IUser } from 'src/app/common/model/user-model';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(private authService:AuthService,private userService:UserService) { }

  canActivate():Observable<boolean>{
    return this.authService.getUser().pipe(
      switchMap(user => this.userService.get(user?.uid).valueChanges()),
      map (appUser => appUser != null? appUser.isAdmin:false)
    )
    
    
  }
}
