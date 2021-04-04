import { Component, OnInit } from '@angular/core';
import { CustomerDto } from 'src/app/models/customerDto';
import { CustomerDtoService } from 'src/app/services/customer-dto.service';

@Component({
  selector: 'app-customer-dto',
  templateUrl: './customer-dto.component.html',
  styleUrls: ['./customer-dto.component.css']
})
export class CustomerDtoComponent implements OnInit {
  customerDtos :CustomerDto[]
  constructor(private customerDtoService:CustomerDtoService) { }

  ngOnInit(): void {
  }

  getCustomerDetails(){
    this.customerDtoService.getCustomerDetails().subscribe((response)=>
    this.customerDtos = response.data)
  }
}
