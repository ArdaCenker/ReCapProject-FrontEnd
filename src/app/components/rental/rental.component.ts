import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  @Input() car:CarDto;
  rentals:Rental[];
  rentalDtos:RentalDto[];
  rentDate:Date;
  customerId:number;
  returnDate:Date;

  firstDateSelected:boolean=false;
  minDate:string;

  constructor(private rentalService:RentalService,
    private paymentService:PaymentService,
    private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response)=>{
      this.rentals=response.data
    })
  }

  getRentalDetails(){
    this.rentalService.getRentalDetails().subscribe((response)=>{
      this.rentalDtos=response.data;
    })
  }

  addRental(){
    let rental:Rental={
      carId: this.car.id,
      customerId:this.customerId,
      rentDate :this.rentDate,
      returnDate :this.returnDate
    };

    this.paymentService.setRental(rental);
    this.toastrService.success("İşlem başarılı, ödeme sayfasına yönlendiriliyorsunuz.")
  }

  onChangeEvent(event:any){
    this.minDate = event.target.value
    this.firstDateSelected = true
  }

  checkReturnDate(){
    if(this.returnDate<this.rentDate){
      this.returnDate = this.rentDate
    }
  }
}
