import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { RentalService } from './rental.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  rental:Rental;
  apiUrl = "https://localhost:44334/payments/"

  constructor(private httpClient:HttpClient,
    private rentalService:RentalService,
    private toastrService:ToastrService) { }

  
  addPayment(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ListResponseModel<Payment>>(newPath,payment);
  }

  addRentalAfterPayment(payment:Payment){
    this.addPayment(payment).subscribe((response)=>{
      this.rentalService.addRental(this.rental).subscribe((response)=>
      this.toastrService.success("İşlem başarılı"))})
  }

  setRental(rental:Rental){
    this.rental=rental;
  }
}
