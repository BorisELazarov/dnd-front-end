import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Spell } from '../../../shared/interfaces/spell';
import { Observable } from 'rxjs';
import { Sort } from '../../../core/sort';
import { Filter } from '../filter';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  url: string='http://localhost:8080/api/spells';
  constructor(private httpClient:HttpClient) {}
  public getAllDeleted(sort:Sort,filter:Filter): Observable<HttpResponse<Spell[]>>{
    if(filter.level=undefined)
    {
      filter.level=-1;
    }
    if(filter.range=undefined)
    {
      filter.range=-1;
    }
    return this.httpClient
      .get<Spell[]>(
        this.url+'/deleted'+'?name='+filter.name+'&level='+filter.level
        +'&castingTime='+filter.castingTime+'&range='+filter.range
        +'&sortBy='+sort.sortBy+'&ascending='+sort.ascending,
        {observe:'response'}
      );
  }
  public getAllUnfiltered(): Observable<HttpResponse<Spell[]>>{
    return this.httpClient.get<Spell[]>(this.url,{observe:'response'});
  }
  public getAll(sort:Sort,filter:Filter): Observable<HttpResponse<Spell[]>>{
    if(filter.level==undefined)
    {
      filter.level=-1;
    }
    if(filter.range==undefined)
    {
      filter.range=-1;
    }
    return this.httpClient
      .get<Spell[]>(
        this.url+'?name='+filter.name+'&level='+filter.level??''
        +'&castingTime='+filter.castingTime+'&range='+filter.range??''
        +'&sortBy='+sort.sortBy+'&ascending='+sort.ascending,
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
