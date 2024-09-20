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
  url: string='http://localhost:8080/api/spells';
  constructor(private httpClient:HttpClient) {}
  public getAllDeleted(sort:Sort,filter:Filter): Observable<HttpResponse<Spell[]>>{
    let levelParam:string;
    let rangeParam:string;
    if(filter.level==undefined)
    {
      levelParam='';
    }
    else{
      levelParam=filter.level.toString();
    }
    if(filter.range==undefined)
    {
      rangeParam='';
    }
    else{
      rangeParam=filter.range.toString();
    }
    return this.httpClient
      .get<Spell[]>(
        this.url+'/deleted'+'?name='+filter.name+'&level='+levelParam
        +'&castingTime='+filter.castingTime+'&range='+rangeParam
        +'&sortBy='+sort.sortBy+'&ascending='+sort.ascending,
        {observe:'response'}
      );
  }
  public getAll(sort:Sort,filter:Filter): Observable<HttpResponse<Spell[]>>{
    return this.httpClient
      .get<Spell[]>(
        this.url+'?name='+filter.name+'&level='+filter.level
        +'&castingTime='+filter.castingTime+'&range='
        +filter.range
        +'&sortBy='+sort.sortBy+'&ascending='+sort.ascending,
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
