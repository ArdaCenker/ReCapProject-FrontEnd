import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  decodedTokenKey: any;
  token :string | null= ""
  apiUrl = "https://localhost:44334/api/auth/"

  constructor(private httpClient:HttpClient,
    private localStorageService:LocalStorageService,
    private jwtHelper: JwtHelperService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }

  loggedIn() {
    if (this.localStorageService.getToken()) {
      return this.jwtHelper.isTokenExpired();
    } else {
      return false;
    }
  }

  isAuthenticated(){
    if (this.localStorageService.getToken()) {
      return true;
    }else{
      return false;
    }
  }

  decodedToken(token: any) {
    return this.jwtHelper.decodeToken(token);
  }
  
  getUser() {
    let decodedToken = this.decodedToken(this.localStorageService.getToken());
    console.log(decodedToken)

    if (decodedToken) {
      if(this.isAuthenticated()){
        let tokenInfoName = Object.keys(decodedToken).filter(u => u.endsWith('/name'))[0];
        let userName = String(decodedToken[tokenInfoName]);

        let tokenInfoId = Object.keys(decodedToken).filter(u => u.endsWith('/nameidentifier'))[0];
        let userId = Number(decodedToken[tokenInfoId]);

        let claimInfo = Object.keys(decodedToken).filter(u => u.endsWith('/role'))[0];
        let roles = decodedToken[claimInfo];

        let tokenInfoEmail = decodedToken.email;

        this.user = {
          userName: userName,
          userId: userId,
          email: tokenInfoEmail,
          roles: roles
        };
      }
    }
    return this.user;
  }

  isAdmin() {
    let isAdmin = false
    if (this.loggedIn()) {
      let claims = this.user.roles?.toString().split(',')
     
      claims?.map(role => {
        if (role.toLocaleLowerCase().indexOf("admin") !== -1) {
          isAdmin = true;
        }
      })
    }
    return isAdmin;
  }

  logOut(){
    this.localStorageService.removeToken();
  }

}
