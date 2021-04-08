import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { CustomerDto } from 'src/app/models/customerDto';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { CustomerDtoService } from 'src/app/services/customer-dto.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalDtoService } from 'src/app/services/rental-dto.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  @Input() car: CarDto;
  carRentalDetails: RentalDto[] = [];
  customerDetails: CustomerDto[] = [];
  dataLoaded = false;
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  state:number = 1;

  firstDateSelected:boolean= false;
  minDate:string;

  constructor(
    private rentalDtoService : RentalDtoService,
    private customerDtoService:CustomerDtoService,
    private paymentService: PaymentService,
    private toastrService:ToastrService
  ) {}




  ngOnInit(): void {
    this.getCarRentalDetails();
    this.getCustomerDetails();
  }


  getCarRentalDetails() {
    this.rentalDtoService.getRentalDetails().subscribe((response) => {
      this.carRentalDetails = response.data;
      this.dataLoaded = true;
    });
  }


  getCustomerDetails() {
    this.customerDtoService.getCustomerDetails().subscribe((response) => {
      this.customerDetails = response.data;
    });
  }


  addRentalCar() {
    let rental: Rental = {
      carId: this.car.id,
      customerId: this.customerId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };
    this.paymentService.setRental(rental);
    this.toastrService.success('Kiralama oluşturuldu, ödeme sayfasına yönlendiriliyorsunuz.');
      this.state =2;
  }


  onChangeEvent(event: any){
    this.minDate = event.target.value
    this.firstDateSelected = true
  }


  checkReturnDate(){
    if (this.returnDate < this.rentDate) {
      this.returnDate = this.rentDate
    }
  }
}
