import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn:boolean
  constructor() {
  }
  public wasLoggedIn(){
    this.isLoggedIn=true

  }
  public wasLoggedOut(){
    this.isLoggedIn=false
  }
  public loginStatus(){
    return this.isLoggedIn;
  }
}
