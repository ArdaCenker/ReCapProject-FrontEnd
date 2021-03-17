import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/car-image';
import { CarDto } from 'src/app/models/carDto';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-dto',
  templateUrl: './car-dto.component.html',
  styleUrls: ['./car-dto.component.css']
})
export class CarDtoComponent implements OnInit {
  carDto: CarDto;
  carImages:CarImage[]=[];
  path = "https://localhost:44334/api/wwwroot"

  constructor(private carService:CarService, private carImageService:CarImageService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"])
      {
        this.getCarDetails(params["carId"]);
        this.getCarImages(params["carId"]);
      }
    });
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.carDto = response.data[0];
    })
  }

  getCarImages(carId:number){
    this.carImageService.getCarImages(carId).subscribe((response)=>{
      this.carImages = response.data;
    })
  }

  getImagePath(image:string){
    let newPath = this.path + image
    return newPath;
  }

}
