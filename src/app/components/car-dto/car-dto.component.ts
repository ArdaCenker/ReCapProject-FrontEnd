import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarDtoService } from 'src/app/services/car-dto.service';

@Component({
  selector: 'app-car-dto',
  templateUrl: './car-dto.component.html',
  styleUrls: ['./car-dto.component.css']
})
export class CarDtoComponent implements OnInit {
  carDtos: CarDto[] = [];
  dataLoaded = false;

  constructor(private carDtoService:CarDtoService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetails(params["carId"])
      }
    })
  }

  getCarDetails(carId:number){
    this.carDtoService.getCarDetails(carId).subscribe((response) => {
      this.carDtos = response.data;
      this.dataLoaded = true;
    })
  }

  getCarImages(carId:number){
    this.carDtoService.getCarImages(carId).subscribe((response)=>{
      this.carDtos = response.data;
      this.dataLoaded= true;
    })
  }

}
