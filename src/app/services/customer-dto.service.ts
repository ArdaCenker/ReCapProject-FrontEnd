import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDto } from '../models/customerDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerDtoService {

  apiUrl = "https://localhost:44334/api/customers/"

  constructor(private httpClient:HttpClient) { }

  getCustomerDetails(){
    let newPath = this.apiUrl+"getcustomerdetails"
    return this.httpClient.get<ListResponseModel<CustomerDto>>(newPath);
  }

}
