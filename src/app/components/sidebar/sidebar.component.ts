import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  filteredCars:Car[];
  brandId="";
  colorId="";
  constructor(private carService:CarService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  currentBrandId(event: any) {
    this.brandId=event;
  }

  currentColorId(event: any) {
    this.colorId=event;
  }

  getCarsByBrandAndColorId(brandId:number,colorId:number) {
    this.carService.getCarsByBrandAndColorId(brandId,colorId).subscribe((response)=>{
    this.filteredCars=response.data
    })
  }

  setRoute() {
    if (this.brandId && this.colorId){
      this.router.navigate([
        'cars/brand/'+this.brandId+'/color/'+this.colorId,
      ]);     
    }
    else if (this.brandId){
      this.router.navigate(['cars/brand/'+this.brandId]);      
    }
    else if (this.colorId){
      this.router.navigate(['cars/color/'+this.colorId]);      
    }
    else{
      this.router.navigate(['cars/']);
    } 
  }

  clearRoute() {
    this.router.navigate(['cars/']);
  }
}
