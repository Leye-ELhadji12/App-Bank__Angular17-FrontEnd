import {Component, inject, signal} from '@angular/core';
import {AccountService} from "../account.service";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-list-account',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './list-account.component.html',
  styleUrl: './list-account.component.sass'
})
export class ListAccountComponent {

  private accountService = inject(AccountService);

  listAccounts = this.accountService.accounts;
  account = this.accountService.account;
  historyFormGroup: FormGroup | undefined;

}
