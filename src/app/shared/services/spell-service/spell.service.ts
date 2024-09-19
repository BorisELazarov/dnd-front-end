import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Spell } from '../../../shared/interfaces/spell';
import { Observable } from 'rxjs';
import { Sort } from '../../../core/sort';
import { Filter } from '../../../features/spells/filter';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  readonly url: string='http://localhost:8080/api/spells';
  constructor(private httpClient:HttpClient) {}
  public getAllDeleted(sort:Sort,filter:Filter): Observable<HttpResponse<Spell[]>>{
    return this.httpClient
      .post<Spell[]>(
        this.url+'/getAll/deleted',{
          filter:filter,
          sort:sort
        },
        {observe:'response'}
      );
  }
  public getAll(sort:Sort,filter:Filter): Observable<HttpResponse<Spell[]>>{
    return this.httpClient
      .post<Spell[]>(
        this.url+'/getAll',{
          filter:filter,
          sort:sort
        },
        {observe:'response'}
      );
  }
  public getAllUnfiltered(): Observable<HttpResponse<Spell[]>>{
    return this.httpClient
      .get<Spell[]>(
        this.url,
        {observe:'response'}
      );
  }
  public getById(id:number): Observable<HttpResponse<Spell>>{
    return this.httpClient
      .get<Spell>(this.url+'/'+id,{observe:'response'});
  }
  public create(spell: Spell):void{
    this.httpClient.post<Spell>(this.url, spell).subscribe();
  }
  public edit(spell: Spell):void{
    this.httpClient.put<Spell>(this.url, spell).subscribe();
  }
  public delete(id:number):void{
    this.httpClient.delete(this.url+"?id="+id).subscribe();
  }
  public confirmedDelete(id:number):void{
    this.httpClient.delete(this.url+"/confirmedDelete?id="+id).subscribe();
  }
  public restore(id:number):void{
    this.httpClient.put(this.url+"/restore/"+id,null).subscribe();
  }
}
