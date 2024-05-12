export interface AccountOperation {
  opId: number;
  operationDate: Date;
  amount: number;
  type: string;
  description: string;
}
export interface AccountHistories {
  id: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  operationDTOList: AccountOperation[];
}

export interface Accounts {
  // type_account: String;
  id: string
  balance: string;
  createdate: Date;
  // "status": null,
  // "customerDTO": {
  //   "id": 3,
  //   "name": "Oumy",
  //   "email": "Oumy@gmail.com"
  // },
  // "overdraft": 10000.0
  // accountId: string;
}
