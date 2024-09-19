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
