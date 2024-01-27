import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private httpClient = inject(HttpClient)

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(' https://jsonplaceholder.typicode.com/users')
  }
}
