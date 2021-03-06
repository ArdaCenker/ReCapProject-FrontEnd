import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentAddForm: FormGroup;
  payment: Payment;
  @Input() customer:number;


  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm() {
    this.paymentAddForm = this.formBuilder.group({
      cardOwnerName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      dateMonth: ['', Validators.required],
      dateYear: ['', Validators.required],
      cvvCode: ['', Validators.required],
    });
  }

  add() {
    if (this.paymentAddForm.valid) {
      this.paymentAddForm.value.cvvCode = Number(this.paymentAddForm.value.cvvCode)
      let paymentModel = Object.assign({}, this.paymentAddForm.value);
      this.paymentService.addRentalAfterPayment(paymentModel);
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}