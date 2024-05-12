import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/Customer";
import {catchError, of, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  http = inject(HttpClient);
  APIUrl = 'http://localhost:8086/';
  readonly customers$ = signal<Customer[]>([]);
  selectedCustomer = signal(0);

  constructor() { }

  subscribe$ = this.http.get<Customer[]>(this.APIUrl+"customers").pipe(
    tap(data => this.customers$.set(data)),
    takeUntilDestroyed(),
    catchError(() => of([] as Customer[]))
  ).subscribe();

  searchCustomers(keyword: String) {
    this.http.get<Customer[]>(this.APIUrl+"customers/search?word="+keyword).pipe(
      tap(data => this.customers$.set(data)),
      catchError(() => of([] as Customer[]))
    ).subscribe();
    return this.customers$;
  }

  saveCustomer(customer: Customer) {
    return this.http.post<Customer>(this.APIUrl+"customers", customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete(this.APIUrl+"customer/"+id);
  }

  onSelectedCustomer(customerId: any){
    this.selectedCustomer.set(customerId);
    console.log(this.selectedCustomer());
  }
}
