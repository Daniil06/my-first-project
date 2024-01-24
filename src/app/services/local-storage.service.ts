// import { Injectable } from '@angular/core';
// import { User } from "../models/User.model";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class LocalStorageService {
//   getItem(key: string): User[] {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : null;
//   }
//   setItem(key: string, value: User[]): void {
//     localStorage.setItem(key, JSON.stringify(value));
//   }
//
// }

import { Injectable } from '@angular/core';
import { User } from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getItem(key: string): User[] | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: User[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
