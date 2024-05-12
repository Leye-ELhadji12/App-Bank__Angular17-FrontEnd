import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../customer.service";
import {Customer} from "../../model/Customer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.sass'
})
export class NewCustomerComponent {

  customerService$ = inject(CustomerService);
  newCustomer: FormGroup = new FormGroup<any>({
    name: new FormControl(""),
    email: new FormControl("")
  });


  constructor(private fb : FormBuilder, private router : Router) {
    //this.addNewCustomer();
    this.newCustomer = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }
  handleSaveCustomer(){
    let customer: Customer = this.newCustomer.value;
    this.customerService$.saveCustomer(customer).subscribe({
      next: data => {
        this.router.navigateByUrl("/client").then(r => true);
        alert("customer has been saved")
      },error: err => {
        console.log(err);
      }
    });
  }

  toggleValidation() {
    const control = this.newCustomer.controls['name'];
    if (control.validator === Validators.required) {
      control.clearValidators();
    } else {
      control.setValidators(Validators.required);
    }
    control.updateValueAndValidity();
  }

}
