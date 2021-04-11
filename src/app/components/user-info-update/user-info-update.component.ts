import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info-update',
  templateUrl: './user-info-update.component.html',
  styleUrls: ['./user-info-update.component.css']
})
export class UserInfoUpdateComponent implements OnInit {

  userInfo = this.authService.getUser();
  changePasswordForm:FormGroup;
  userInfoEditForm: FormGroup;


  constructor(private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private userService:UserService, 
    private toastrService:ToastrService,
    private router : Router) {
  }

  ngOnInit(): void {
    this.createUserInfoEditForm();
    this.createChangePasswordForm();
  }

  ngDoCheck(){
    if(!this.authService.loggedIn()){

    }
  }

  createUserInfoEditForm() {
    let userFullName: String[];
    userFullName = this.userInfo.userName.split(' ');

    this.userInfoEditForm = this.formBuilder.group({
      email: [this.userInfo.email],
      firstName: [userFullName.slice(0,userFullName.length-1).toString().replace(',', ' '), Validators.required],
      lastName: [userFullName[userFullName.length-1], Validators.required]
    });
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      email: [this.userInfo.email],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }


  updateUserInfos(){
    if (this.userInfoEditForm.valid){
      let userInfosModel = Object.assign({}, this.userInfoEditForm.value);
      this.userService.updateUserInfos(userInfosModel).subscribe(response=>{
        this.toastrService.success(response.message, 'User Information Updated.')
        this.authService.logOut();
        this.router.navigate(['/login'])
      }, responseError => {
        this.toastrService.error(responseError.errors, 'User Information Is Not Updated.')
      })
    }else{
      this.toastrService.error('Form Invalid.')
    }

  }

  updateUserPassword(){
    if (this.changePasswordForm.valid){
      let userPasswordModel= Object.assign({}, this.changePasswordForm.value);
      this.userService.changeUserPassword(userPasswordModel).subscribe(response=>{
        this.toastrService.success(response.message, 'Password Changed.')
        this.authService.logOut();
        this.router.navigate(['/login'])
      }, responseError=>{
        this.toastrService.error(responseError.errors, 'Password Not Changed.')
      })
    }else{
      this.toastrService.error('Form Invalid.')
    }
  }
}
