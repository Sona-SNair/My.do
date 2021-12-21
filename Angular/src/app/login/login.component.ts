import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import {UserModel} from '../shared/user.model'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  constructor(private fb : FormBuilder, private api : ApiService, private router : Router, private auth : AuthService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.auth.username.next("")
    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
  }
  login(){
    let loginObj = {
      Email : this.loginForm.value.email,
      Password:this.loginForm.value.password
    }
    this.api.login(loginObj).subscribe({
      next:(res)=>{
        console.log(res);
        alert("Login Success!!!");
        localStorage.setItem("userID",res.userData.id);
        localStorage.setItem("username",res.userData.fullName)
        this.auth.username.next(res.userData.fullName);
        this.loginForm.reset();
        this.router.navigate(['taskdashboard']);
        localStorage.setItem('fakeToken',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
      },
      error:(err)=>{
        console.log(err);
        alert("Something went wrong!!!");
      }
    })
    
  }
}
