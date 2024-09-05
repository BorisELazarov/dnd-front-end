import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proficiency } from '../proficiency';

@Injectable({
  providedIn: 'root'
})
export class ProficiencyService {
  url: string='http://localhost:8080/api/proficiencies';
  constructor(private httpClient:HttpClient) {}
  public getAll(): Observable<HttpResponse<Proficiency[]>>{
    return this.httpClient
      .get<Proficiency[]>(this.url,{observe:'response'});
  }
  public getById(id:number): Observable<HttpResponse<Proficiency>>{
    return this.httpClient
      .get<Proficiency>(this.url+'/'+id,{observe:'response'});
  }
  public create(proficiency: Proficiency):void{
    this.httpClient.post<Proficiency>(this.url, proficiency).subscribe();
  }
  public edit(proficiency: Proficiency):void{
    this.httpClient.put<Proficiency>(this.url+"/edit", proficiency).subscribe();
  }
  public delete(id:number):void{
    this.httpClient.delete(this.url+"?id="+id).subscribe();
  }
}
