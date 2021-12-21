import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username = new BehaviorSubject<string>("");
  constructor() { }

  isLoggedIn(){
    return !!localStorage.getItem("fakeToken");
  }
}
