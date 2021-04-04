import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { Customer } from 'src/app/models/customer';
import { CustomerDto } from 'src/app/models/customerDto';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalDtoService } from 'src/app/services/rental-dto.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-dto',
  templateUrl: './rental-dto.component.html',
  styleUrls: ['./rental-dto.component.css']
})
export class RentalDtoComponent implements OnInit {
  @Input() car: CarDto;
  rentalDtos: RentalDto[] = [];
  customerDtos: CustomerDto[] = [];
  dataLoaded = false;
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  state:number = 1;

  firstDateSelected:boolean= false; 
  minDate:string; 

  constructor(private rentalDtoService : RentalDtoService,
    private customerService:CustomerService,
    private rentalService:RentalService,
    private paymentService: PaymentService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
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
    this.state =2;
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
