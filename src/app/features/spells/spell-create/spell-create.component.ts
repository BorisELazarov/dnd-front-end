import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Spell } from '../../../shared/interfaces/spell';
import { Router } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SpellService } from '../../../shared/services/spell-service/spell.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-spell-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSlideToggleModule,
    MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule],
  templateUrl: './spell-create.component.html',
  styleUrl: './spell-create.component.css'
})
export class SpellCreateComponent implements OnDestroy {
  protected isDirty:boolean=false;

  private destroy= new Subject<void>();

  protected createForm :FormGroup;
  constructor(private spellService: SpellService,
    fb :FormBuilder, private router:Router) {
    this.createForm = fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      castingRange: ['0',[Validators.required, Validators.min(0)]],
      castingTime: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      components: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(50)]],
      description: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(65535)]],
      durationType: ['instant'],
      durationValue: ['1',[Validators.required,Validators.min(1)]],
      level: ['0',[Validators.required,Validators.min(0),Validators.max(9)]],
      target: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]]
    });
  }

  submit() {
    let name:string=this.createForm.controls['name'].value;
    let castingRange:number=this.createForm.controls['castingRange'].value;
    let castingTime:string=this.createForm.controls['castingTime'].value;
    let components:string=this.createForm.controls['components'].value;
    let description:string=this.createForm.controls['description'].value;
    let durationValue:number=this.createForm.controls['durationValue'].value;
    let duration:number;
    let level=this.createForm.controls['level'].value;
    let target=this.createForm.controls['target'].value;;
    switch (this.createForm.controls['durationType'].value) {
      case "rounds":
        duration=durationValue*6;
        break;

      case "minutes":
          duration=durationValue*60;
          break;
      
      case "hours":
          duration=durationValue*60*60;
          break;
      
      case "days":
        duration=durationValue*24*60*60;
        break;

      default:
        duration=0;
        break;
    }
    let spell:Spell={
      name: name,
      castingRange:castingRange,
      castingTime:castingTime,
      components:components,
      description:description,
      duration:duration,
      level:level,
      target:target
    };
    if(this.createForm.valid){
      this.spellService.create(spell).pipe(
        takeUntil(this.destroy)
      ).subscribe();
      this.router.navigateByUrl('/spells');
    }
    else{
      this.isDirty=true;
    }
  }

  ngOnDestroy(): void {
    this.destroy.complete();
  }
}
