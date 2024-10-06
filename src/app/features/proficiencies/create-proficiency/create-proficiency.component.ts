import { Component, OnDestroy } from '@angular/core';
import { ProficiencyService } from '../../../shared/services/proficiency-service/proficiency.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Proficiency } from '../../../shared/interfaces/proficiency';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-proficiency',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSlideToggleModule,
    MatFormFieldModule, MatInputModule],
  templateUrl: './create-proficiency.component.html',
  styleUrl: './create-proficiency.component.css',
})
export class CreateProficiencyComponent implements OnDestroy{
  private destroy=new Subject<void>();
  protected createForm:FormGroup;
  protected isDirty:boolean=false;

  constructor(private proficiencyService: ProficiencyService,
    fb :FormBuilder, private router:Router) {
    this.createForm = fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      type: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]]
    });
  }

  submit() {
    this.isDirty=true;
    let name=this.createForm.get('name')?.value;
    let type=this.createForm.get('type')?.value;
    let proficiency:Proficiency={
      name: name,
      type: type
    };
    if(this.createForm.valid){
      this.proficiencyService.create(proficiency).pipe(
        takeUntil(this.destroy)
      ).subscribe();
      this.router.navigateByUrl('/proficiencies');
    }
  }

  ngOnDestroy(): void {
    this.destroy.complete();
  }
}
