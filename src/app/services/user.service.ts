import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordModel } from '../models/changePasswordModel';
import { ResponseModel } from '../models/responseModel';
import { UserInfoModel } from '../models/userInfoModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44334/api/users/"
  constructor(private httpClient:HttpClient) { }


  updateUserInfos(userInfo:UserInfoModel):Observable<ResponseModel>{
    let newPath =this.apiUrl + 'updateuserinfos';
    return this.httpClient.post<ResponseModel>(newPath,userInfo)
  }

  changeUserPassword(changePasswordInfos:ChangePasswordModel):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'changeuserpassword';
    return this.httpClient.post<ResponseModel>(newPath, changePasswordInfos)
  }
}