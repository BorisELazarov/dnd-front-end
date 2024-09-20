import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string='http://localhost:8080/api/users';
  constructor(private httpClient:HttpClient) { }

  public getById(id:number): Observable<HttpResponse<User>>{
    return this.httpClient
      .get<User>(this.url+'/'+id,{observe:'response'});
  }
}
