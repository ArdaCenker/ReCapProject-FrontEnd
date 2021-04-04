import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  dataLoaded = false;
  allBrand:Brand;
  currentBrand:Brand = {brandId : 0, brandName: ""} ;
  @Output() brandId = new EventEmitter<string>();
  filterText = "";

  constructor(private brandService:BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
      this.dataLoaded= true;
    })
  }

  setCurrentBrand(){
    this.brandId.emit(this.currentBrand?.brandId.toString())
  }

  allBrandSelected(){
    return this.currentBrand == undefined ? true : false;
  } 

  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  
}
