import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  removeToken(){
    localStorage.removeItem("token")
  }

  getToken():any{
    localStorage.getItem("token");
  }

  setToken(token:string){
    localStorage.setItem("token",token);
  }
}
