import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper'
import { ClassService } from '../../../shared/services/class-service/class.service';
import { SpellService } from '../../../shared/services/spell-service/spell.service';
import { DndClass } from '../../../shared/interfaces/dnd-class';
import { Spell } from '../../../shared/interfaces/spell';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-character-creation',
  standalone: true,
  imports: [MatStepperModule, FormsModule,
    ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './character-creation.component.html',
  styleUrl: './character-creation.component.css'
})
export class CharacterCreationComponent implements OnInit{

  classList:DndClass[]=[];
  spellList:Spell[]=[];

  createFormGroup:FormGroup;
  
  constructor (private classService:ClassService,
    private spellService:SpellService, fb:FormBuilder
  ){
    this.createFormGroup =fb.group({
      strength: [8, Validators.required],
      dexterity: [8, Validators.required],
      constitution: [8, Validators.required],
      intelligence: [8, Validators.required],
      wisdom: [8, Validators.required],
      charisma: [8, Validators.required],
      dndClass: ['', Validators.required],
      spells: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.classService.getAllUnfiltered().subscribe(response=>
    {
      this.classList=response.body??[];
    });
    this.spellService.getAllUnfiltered().subscribe(response=>
    {
      this.spellList=response.body??[];
    });
  }
}
