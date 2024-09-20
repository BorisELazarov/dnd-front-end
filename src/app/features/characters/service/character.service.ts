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
  readonly url: string='http://localhost:8080/api/characters';

  constructor(private httpClient:HttpClient) { }

  getAllDeleted(sort: Sort, filter: Filter, userId:number):Observable<HttpResponse<CharacterListItem[]>> {
    return this.httpClient
      .post<CharacterListItem[]>(
        this.url+'/getForUser/deleted/'+userId,{
          filter:filter,
          sort:sort
        },
        {observe:'response'}
      );
  }

  getAll(sort: Sort, filter: Filter, userId:number):Observable<HttpResponse<CharacterListItem[]>> {
    return this.httpClient
      .post<CharacterListItem[]>(
        this.url+'/getForUser/'+userId,{
          filter:filter,
          sort:sort
        },
        {observe:'response'}
      );
  }

  public getById(id:number): Observable<HttpResponse<Character>>{
    return this.httpClient
      .get<Character>(this.url+'/'+id,{observe:'response'});
  }

  public create(character: Character):Observable<Character>{
    return this.httpClient.post<Character>(this.url, character);
  }

  public edit(character: Character):Observable<Character>{
    return this.httpClient.put<Character>(this.url, character);
  }

  public delete(id:number):Observable<Object>{
    return this.httpClient.delete(this.url+"?id="+id);
  }

  public confirmedDelete(id:number):Observable<Object>{
    return this.httpClient.delete(this.url+"/confirmedDelete?id="+id);
  }

  public restore(id:number):Observable<Object>{
    return this.httpClient.put(this.url+"/restore/"+id,null);
  }
}
