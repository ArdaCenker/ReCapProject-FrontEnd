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
  
  rentalDtos: RentalDto[] = [];

  constructor(private rentalDtoService : RentalDtoService) { }

  ngOnInit(): void {
    this.getRentalDetails();
  }
  
  getRentalDetails(){
    this.rentalDtoService.getRentalDetails().subscribe((response)=>{
      this.rentalDtos=response.data;
    })
  }
}
