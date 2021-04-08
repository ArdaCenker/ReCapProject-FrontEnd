import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';

@Injectable({
  providedIn: 'root'
})
export class RentalDtoService {

  apiUrl = 'https://localhost:44334/api/rentals/';

  constructor(private httpClient:HttpClient) { }

  getRentalDetails():Observable<ListResponseModel<RentalDto>>{
    let newPath= this.apiUrl+"getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }
}
