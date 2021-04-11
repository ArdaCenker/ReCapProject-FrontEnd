import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  decodedToken:any;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService, 
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        this.localStorageService.setToken(response.data.token)
        this.authService.decodedTokenKey = this.authService.decodedToken(response.data.token)
        this.authService.getUser()
        this.router.navigate(["/"])
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Form hatalı");
    }
  }
}
