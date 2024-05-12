import {Component, inject, Signal, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "./account.service";
import {AsyncPipe} from "@angular/common";
import {AccountHistories} from "../model/Account";

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.sass'
})
export class CompteComponent {

  formAccount!: FormGroup;

  currentPage: number = 0;
  sizePage: number = 6;
  accountHistories = this.accountService.account;

  constructor(private formBuilder : FormBuilder, private accountService: AccountService) {
    this.formAccount = this.formBuilder.group({
      accountId: this.formBuilder.control('')
    });
  }

  // searchAccount() {
  //   let accountId: string = this.formAccount.value.accountId;
  //   this.accountService.getAccount(accountId, this.currentPage, this.sizePage);
  // }

}
