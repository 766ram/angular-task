import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : AuthService,
    private router: Router, ){

  }
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true
    }else{
      // this.toast.warning("ERROR", "Access Denied. Please Login First!");
      this.router.navigate(['login'])
      return false;
    }
  }

}
