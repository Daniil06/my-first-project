import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private httpClient = inject(HttpClient)

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(' https://jsonplaceholder.typicode.com/users')
  }
}
