import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../models/IUser.model";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor( private httpClient: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(' https://jsonplaceholder.typicode.com/users')
  }
}
