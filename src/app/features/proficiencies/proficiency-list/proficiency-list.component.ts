import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Proficiency } from '../proficiency';
import { ProficiencyService } from '../service/proficiency.service';
import { EditProficiencyComponent } from '../edit-proficiency/edit-proficiency.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proficiency',
  standalone: true,
  imports: [CommonModule, EditProficiencyComponent, RouterLink],
  template:'<h1>Proficiencies:</h1>',
  templateUrl: './proficiency-list.component.html',
  styleUrl: './proficiency-list.component.css'
})
export class ProficiencyListComponent {
  proficiencyList:Proficiency[]=[];
  constructor(proficiencyService:ProficiencyService){
    
    proficiencyService.getAll().subscribe(response=>{
      this.proficiencyList=response.body??[];
    });
  }
}
