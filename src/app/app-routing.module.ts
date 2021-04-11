import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDtoComponent } from './components/car-dto/car-dto.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalDtoComponent } from './components/rental-dto/rental-dto.component';
import { UserInfoUpdateComponent } from './components/user-info-update/user-info-update.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId", component:CarComponent},
  {path:"brands", component:BrandListComponent},
  {path:"colors", component:ColorListComponent},
  {path:"rentals", component:RentalDtoComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/detail/:carId", component:CarDtoComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"cars/update", component:CarUpdateComponent},
  {path:"colors/update", component:ColorUpdateComponent},
  {path:"brands/update", component:BrandUpdateComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"useredit", component:UserInfoUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
