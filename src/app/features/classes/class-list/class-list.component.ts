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
import { DndClass } from '../../../shared/interfaces/dnd-class';
import { Sort } from '../../../core/sort';
import { Filter } from '../filter';
import { HitDice } from '../../../shared/enums/hit-dice';
import { ClassService } from '../../../shared/services/class-service/class.service';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule,
    MatPaginatorModule, MatSelectModule, MatButtonModule,
    MatInputModule, MatIconModule, FormsModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css'
})
export class ClassListComponent  implements OnInit{
  protected dataSource:MatTableDataSource<DndClass>=new MatTableDataSource<DndClass>([]);
  columnsToDisplay : string[] = ['name', 'hitDice' ,'actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  protected sort:Sort;
  protected filter:Filter;
  
  constructor(private classService:ClassService){
    this.sort={
      sortBy:'',
      ascending: true
    };
    this.filter={
      name:''
    };
   }
  
   ngOnInit(): void {
     this.classService.getAll(this.sort,this.filter).subscribe(response=>{
     this.dataSource.data=response.body??[];
     this.dataSource.paginator=this.paginator;
    });
   }
  
   search():void {
    this.classService.getAll(this.sort,this.filter).subscribe(response=>{
     this.dataSource.data=response.body??[];
    });
   }
  }