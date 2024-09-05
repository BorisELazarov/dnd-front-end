import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProficiencyService } from '../service/proficiency.service';
import { Proficiency } from '../proficiency';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-proficiency',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule, MatInputModule],
  templateUrl: './edit-proficiency.component.html',
  styleUrl: './edit-proficiency.component.css'
})
export class EditProficiencyComponent {
  editForm :FormGroup;
  proficiency:Proficiency|undefined;
  constructor(private proficiencyService: ProficiencyService,
    fb: FormBuilder, route: ActivatedRoute) {
    let id=Number(route.snapshot.params['id']);
    this.editForm = fb.group({
      id: [id,Validators.required],
      name: ['',Validators.required],
      type: ['',Validators.required]
    });
    proficiencyService.getById(id).subscribe(response=>{
      this.proficiency=response.body??undefined;
      this.editForm.controls['name'].setValue(this.proficiency?.name);
      this.editForm.controls['type'].setValue(this.proficiency?.type);
    });
  }

  submit() {
    let id=this.editForm.controls['id'].value;
    let name=this.editForm.controls['name'].value;
    let type=this.editForm.controls['type'].value;
    let proficiency:Proficiency={
      id: id,
      name: name,
      type: type
    };
    if(this.editForm.valid){
      this.proficiencyService.create(proficiency);
    }
    else{
      alert('Unvalid input!');
    }
  }
}
