// import { Injectable } from '@angular/core';
// import { IUser } from "../models/IUser.model";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class LocalStorageService {
//   getItem(key: string): IUser[] {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : null;
//   }
//   setItem(key: string, value: IUser[]): void {
//     localStorage.setItem(key, JSON.stringify(value));
//   }
//
// }

import { Injectable } from '@angular/core';
import { IUser } from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getItem(key: string): IUser[] | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: IUser[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
