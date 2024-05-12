import {DestroyRef, effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountHistories, Accounts} from "../model/Account";
import {catchError, of, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CustomerService} from "../client/customer.service";
import {Customer} from "../model/Customer";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  private customerService = inject(CustomerService);
  // private accountUrl = 'http://localhost:8086/';
  account = signal<AccountHistories[]>([]);

  private currentPage = signal(0);
  private sizePage = signal(6);
  private selectedAccountId = signal(0);

  constructor() { }

  // tasksEffect = effect(() => {
  //   this.http.get<AccountHistories[]>(this.customerService.APIUrl+"accounts/"+this.selectedAccountId+"/operationsHistories?page="+this.currentPage+"&size="+this.sizePage).pipe(
  //     tap(tasks => this.account.set(tasks), error => "error setting data into signal"),
  //     takeUntilDestroyed(this.destroyRef),
  //     catchError(() => of([] as AccountHistories[]))
  //   ).subscribe(
  //     tasks => this.account.set(tasks)
  //   )
  // });

  // getAccount(id: String, page: number, size: number) {
  //   effect(() => {
  //     this.http.get<AccountHistories[]>(this.accountUrl+"accounts/"+id+"/operationsHistories?page="+page+"&size="+size).pipe(
  //       tap(tasks => this.account.set(tasks)),
  //       takeUntilDestroyed(this.destroyRef),
  //       catchError(() => of([] as AccountHistories[]))
  //     ).subscribe(
  //       tasks => this.account.set(tasks)
  //     )
  //   });
  //   //   this.http.get<AccountHistories[]>(this.accountUrl+"accounts/"+id+"/operationsHistories?page="+page+"&size="+size).pipe(
  //   //   tap(data => this.account.set(data)),
  //   //   takeUntilDestroyed(this.destroyRef),
  //   //   catchError(() => of([] as AccountHistories[]))
  //   // ).subscribe();
  //   console.log("esk ca recupere");
  //   console.log(this.account())
  //   console.log("ca recupere");
  // }

  setSelectedAccount(id: number) {
    this.selectedAccountId.set(id);
  }

  customerId = this.customerService.selectedCustomer();
  accounts = signal<Accounts[]>([]);
  destroyRef = inject(DestroyRef);


  list = effect(() =>
    this.http.get<Accounts[]>(this.customerService.APIUrl+"accounts/list-account/" + this.customerService.selectedCustomer()).pipe(
      tap(data => this.accounts.set(data)),
      takeUntilDestroyed(this.destroyRef),
      catchError(() => of("error of receiving data"))
    ).subscribe()
  );

  // subscribe$ = this.http.get<Accounts[]>(this.customerService.APIUrl+"accounts").pipe(
  //   tap(data => this.accounts.set(data)),
  //   takeUntilDestroyed(),
  //   catchError(() => of([] as Customer[]))
  // ).subscribe();

}
