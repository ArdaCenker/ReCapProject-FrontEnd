import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDtoComponent } from './components/car-dto/car-dto.component';
import { RentalDtoComponent } from './components/rental-dto/rental-dto.component';
import { FilterCarPipePipe } from './pipes/filter-car-pipe.pipe';
import { FilterBrandPipePipe } from './pipes/filter-brand-pipe.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';
import { BrandListComponent } from './components/brand-list/brand-list.component'
import { ColorListComponent } from './components/color-list/color-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CustomerDtoComponent } from './components/customer-dto/customer-dto.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { JwtModule } from '@auth0/angular-jwt';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInfoUpdateComponent } from './components/user-info-update/user-info-update.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarDtoComponent,
    RentalDtoComponent,
    FilterCarPipePipe,
    FilterBrandPipePipe,
    FilterColorPipePipe,
    BrandListComponent,
    ColorListComponent,
    SidebarComponent,
    PaymentComponent,
    CustomerDtoComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    ColorDeleteComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    CarAddComponent,
    CarDeleteComponent,
    LoginComponent,
    RegisterComponent,
    UserInfoUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/"]
      },
    }),
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
