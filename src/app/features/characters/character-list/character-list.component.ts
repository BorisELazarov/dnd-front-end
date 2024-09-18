import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Filter } from '../filter';
import { Sort } from '../../../core/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CharacterService } from '../service/character.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CharacterListItem } from '../../../shared/list-items/character-list-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule,
    MatPaginatorModule, MatSelectModule, MatButtonModule,
    MatInputModule, MatIconModule, FormsModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
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
     this.characterService.getAll(this.sort,this.filter,Number(this.route.snapshot.params['id'])).subscribe(response=>{
     this.dataSource.data=response.body??[];
     this.dataSource.paginator=this.paginator;
    });
   }

   openDialog(id: number):void {
    let character:CharacterListItem|undefined=this.dataSource.data.find(x=>x.id==id);
    if (character===undefined) {
      return;
    }
    if(
      confirm("Are you sure to destroy "
      +character.name+" the Lvl"+character.level
      +" "+character.dndClass.name+"?")
    ) {
      this.characterService.delete(id);
      this.dataSource.data=this.dataSource.data.filter(x=>x.id!=id);
    }
  }
  
   search():void {
    this.characterService.getAll(this.sort,this.filter,Number(this.route.snapshot.params['id'])).subscribe(response=>{
     this.dataSource.data=response.body??[];
    });
   }
}
