import { Injectable } from '@angular/core';
import { CharacterListItem } from '../../../shared/list-items/character-list-item';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Sort } from '../../../core/sort';
import { Filter } from '../filter';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  url: string='http://localhost:8080/api/characters';

  constructor(private httpClient:HttpClient) { }

  getAllDeleted(sort: Sort, filter: Filter):Observable<HttpResponse<CharacterListItem[]>> {
    return this.httpClient
      .get<CharacterListItem[]>(
        this.url+'/deleted'+'?name='+filter.name+'&level='+filter.level
        +'&className'+filter.dndClass
        +'&sortBy='+sort.sortBy+'&ascending='+sort.ascending,
        {observe:'response'}
      );
  }

  getAll(sort: Sort, filter: Filter, userId:number):Observable<HttpResponse<CharacterListItem[]>> {
    return this.httpClient
      .get<CharacterListItem[]>(
        this.url+'/getForUser/'+userId+'?name='+filter.name+'&level='+filter.level
        +'&className='+filter.dndClass
        +'&sortBy='+sort.sortBy+'&ascending='+sort.ascending,
        {observe:'response'}
      );
  }

  public getById(id:number): Observable<HttpResponse<Character>>{
    return this.httpClient
      .get<Character>(this.url+'/'+id,{observe:'response'});
  }

  public create(character: Character):void{
    this.httpClient.post<Character>(this.url, character).subscribe();
  }

  public edit(character: Character):void{
    this.httpClient.put<Character>(this.url, character).subscribe();
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
