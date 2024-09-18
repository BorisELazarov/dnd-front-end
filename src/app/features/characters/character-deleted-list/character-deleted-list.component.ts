import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CharacterListItem } from '../../../shared/list-items/character-list-item';
import { Filter } from '../filter';
import { CharacterService } from '../service/character.service';
import { Sort } from '../../../core/sort';

@Component({
  selector: 'app-character-deleted-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule,
    MatPaginatorModule, MatSelectModule, MatButtonModule,
    MatInputModule, MatIconModule, FormsModule],
  templateUrl: './character-deleted-list.component.html',
  styleUrl: './character-deleted-list.component.css'
})
export class CharacterDeletedListComponent  implements OnInit {
  protected rangeText:string='';
  protected dataSource:MatTableDataSource<CharacterListItem> = new MatTableDataSource<CharacterListItem>([]);
  protected columnsToDisplay : string[] = ['name', 'level','dndClass', 'actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  protected sort:Sort;
  protected filter:Filter;
  
  constructor(private characterService:CharacterService, private route:ActivatedRoute){
    this.sort={
      sortBy:'',
      ascending: true
    };
    this.filter={
      name:'',
      level:0,
      dndClass:''
    };
   }
  
   ngOnInit(): void {
     this.characterService.getAllDeleted(this.sort,this.filter,Number(this.route.snapshot.params['id'])).subscribe(response=>{
     this.dataSource.data=response.body??[];
     this.dataSource.paginator=this.paginator;
    });
   }

   openDialog(id: number) {
    let character:CharacterListItem|undefined=this.dataSource.data.find(x=>x.id==id);
    if (character===undefined) {
      return;
    }
    if(
      confirm("Are you sure to destroy "
        +character.name+" the Lvl"+character.level
        +" "+character.dndClass.name+" once and for all?")
    ) {
      this.characterService.confirmedDelete(id);
      this.removeFromDataSource(id);
    }
   }
   
   restore(id:number):void {
    this.characterService.restore(id);
    this.removeFromDataSource(id);
   }

   removeFromDataSource(id:number):void{
    this.dataSource.data=this.dataSource.data.filter(x=>x.id!=id);
   }
  
   search():void {
    this.characterService.getAll(this.sort,this.filter,Number(this.route.snapshot.params['id'])).subscribe(response=>{
     this.dataSource.data=response.body??[];
    });
   }
}
