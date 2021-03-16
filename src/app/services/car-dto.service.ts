import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDto } from '../models/carDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDtoService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getCarDetails(carId:number){
    let newPath = this.apiUrl + "cars/getcardetails?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarImages(carId:number){
    let newPath = this.apiUrl + "carimages/getallbycarid"+carId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }
}
