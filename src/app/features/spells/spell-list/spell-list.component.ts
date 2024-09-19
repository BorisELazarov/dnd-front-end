import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Filter } from '../filter';
import { Sort } from '../../../core/sort';
import { Spell } from '../../../shared/interfaces/spell';
import { SpellService } from '../../../shared/services/spell-service/spell.service';

@Component({
  selector: 'app-spell-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule,
    MatPaginatorModule, MatSelectModule, MatButtonModule,
    MatInputModule, MatIconModule, FormsModule],
  templateUrl: './spell-list.component.html',
  styleUrl: './spell-list.component.css'
})
export class SpellListComponent implements OnInit{
  protected rangeText:string='';
  protected dataSource:MatTableDataSource<Spell> = new MatTableDataSource<Spell>([]);
  protected columnsToDisplay : string[] = ['name', 'level','castingTime','castingRange', 'actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  protected sort:Sort;
  protected filter:Filter;
  
  constructor(private spellService:SpellService){
    this.sort={
      sortBy:'',
      ascending: true
    };
    this.filter={
      name:'',
      castingTime:'',
    };
   }
  
   ngOnInit(): void {
     this.spellService.getAll(this.sort,this.filter).subscribe(response=>{
     this.dataSource.data=response.body??[];
     this.dataSource.paginator=this.paginator;
    });
   }
  
   search():void {
    if(this.rangeText===null||this.rangeText==='')
    {
      this.filter.range=-1;
    }
    else{
      this.filter.range=parseInt(this.rangeText);
    }
    this.spellService.getAll(this.sort,this.filter).subscribe(response=>{
     this.dataSource.data=response.body??[];
    });
   }
}
