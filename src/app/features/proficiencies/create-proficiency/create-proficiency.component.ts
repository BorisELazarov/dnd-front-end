import { Component } from '@angular/core';
import { ProficiencyService } from '../service/proficiency.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Proficiency } from '../proficiency';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {} from '@angular/material/';

@Component({
  selector: 'app-create-proficiency',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSlideToggleModule,
    MatFormFieldModule, MatInputModule],
  templateUrl: './create-proficiency.component.html',
  styleUrl: './create-proficiency.component.css',
})
export class CreateProficiencyComponent {
  createForm :FormGroup;
  constructor(private proficiencyService: ProficiencyService, fb :FormBuilder) {
    this.createForm = fb.group({
      name: ['',Validators.required],
      type: ['',Validators.required]
    });
  }

  submit() {
    let name=this.createForm.controls['name'].value;
    let type=this.createForm.controls['type'].value;
    let proficiency:Proficiency={
      name: name,
      type: type
    };
    if(this.createForm.valid){
      this.proficiencyService.create(proficiency);
    }
    else{
      alert('Unvalid input!');
    }
  }
}
