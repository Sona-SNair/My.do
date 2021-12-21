import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser : string = ""

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    this.loggedInUser = localStorage.getItem("username")!
    this.auth.username.subscribe(val=>{
      this.loggedInUser = val;
    })
  }

}
