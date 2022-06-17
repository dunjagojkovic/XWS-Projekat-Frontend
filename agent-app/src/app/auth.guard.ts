import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  roleAs: any;

  constructor(
    public router: Router
    ) {}
 
    canActivate(route: ActivatedRouteSnapshot): boolean {

      for(var role in route.data["role"] as Array<string> ){
        if(route.data['role'] != this.getRole()) { 
          this.router.navigate(['/notFound']); 
          return false;
        }
      }  

      return true;
    }

  getRole() {

    let userStrng = localStorage.getItem('user');
    this.roleAs = '';

    if(userStrng) {
      let user = JSON.parse(userStrng);
      this.roleAs = user.role;
      return user.role;
    }

    this.roleAs = ''
    return this.roleAs;
  }
  
  
}
