import { Component, Input, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';


@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  
  @Input() car: Car;
  brands: Brand[];
  colors: Color[];
  carUpdateForm:FormGroup;

  constructor(private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarUpdateForm();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  createCarUpdateForm(){
    this.carUpdateForm= this.formBuilder.group({
      id:[this.car.id,Validators.required],
      modelYear:[this.car.modelYear,Validators.required],
      brandId:[this.car.brandId,Validators.required],
      colorId:[this.car.colorId,Validators.required],
      dailyPrice:[this.car.dailyPrice,Validators.required],
      description:[this.car.description,Validators.required]
    })
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value)
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat");
    }
  }
}
