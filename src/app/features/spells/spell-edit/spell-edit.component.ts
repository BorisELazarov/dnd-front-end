import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Spell } from '../../../shared/interfaces/spell';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SpellService } from '../../../shared/services/spell-service/spell.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-spell-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSlideToggleModule,
    MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule],
  templateUrl: './spell-edit.component.html',
  styleUrl: './spell-edit.component.css'
})
export class SpellEditComponent implements OnInit, OnDestroy{
  protected isDirty:boolean=false;

  private destroy=new Subject<void>();

  protected editForm :FormGroup;
  protected spell:Spell|undefined;
  constructor(private spellService: SpellService,
    fb :FormBuilder, private router:Router,
    route:ActivatedRoute) {
    let id=Number(route.snapshot.params['id']);
    this.editForm = fb.group({
      id:[id],
      name: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      castingRange: [0,[Validators.required, Validators.min(0)]],
      castingTime: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      components: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(50)]],
      description: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(65535)]],
      durationType: ['instant'],
      durationValue: [1,[Validators.required,Validators.min(1)]],
      level: [0,[Validators.required,Validators.min(0),Validators.max(9)]],
      target: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]]
    });
  }

  ngOnInit():void{
    this.spellService.getById(this.editForm.controls['id'].value).pipe(
      takeUntil(this.destroy)
    ).subscribe(response=>{
        this.spell=response.body??undefined;
        this.editForm.controls['name'].setValue(this.spell?.name);
        this.editForm.controls['castingRange'].setValue(this.spell?.castingRange);
        this.editForm.controls['castingTime'].setValue(this.spell?.castingTime);
        this.editForm.controls['components'].setValue(this.spell?.components);
        this.editForm.controls['description'].setValue(this.spell?.description);
        this.editForm.controls['level'].setValue(this.spell?.level.toString());
        this.editForm.controls['target'].setValue(this.spell?.target);

        if (this.spell?.duration===0) {
          this.editForm.controls['durationType'].setValue('instant');
        }
        else if((this.spell?.duration??-1)%(60*60*24)===0) {
          this.editForm.controls['durationType'].setValue('minuthourses');
          this.editForm.controls['durationValue'].setValue((this.spell?.duration??-1)/(60*60));
        }
        else if ((this.spell?.duration??-1)%(60*60)===0) {
          this.editForm.controls['durationType'].setValue('minuthourses');
          this.editForm.controls['durationValue'].setValue((this.spell?.duration??-1)/(60*60));
        }
        else if ((this.spell?.duration??-1)%60===0) {
          this.editForm.controls['durationType'].setValue('minutes');
          this.editForm.controls['durationValue'].setValue((this.spell?.duration??-1)/60);
        }
        else {
          this.editForm.controls['durationType'].setValue('rounds');
          this.editForm.controls['durationValue'].setValue((this.spell?.duration??-1)/6);
        }
      });
    
  }

  submit() {
    let name=this.editForm.controls['name'].value;
    let castingRange=this.editForm.controls['castingRange'].value;
    let castingTime=this.editForm.controls['castingTime'].value;
    let components=this.editForm.controls['components'].value;
    let description=this.editForm.controls['description'].value;
    let durationValue:number=this.editForm.controls['durationValue'].value;
    let duration:number;
    let level=this.editForm.controls['level'].value;
    let target=this.editForm.controls['target'].value;;
    switch (this.editForm.controls['durationType'].value) {
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
    this.spell={
      id:this.spell?.id,
      name: name,
      castingRange:castingRange,
      castingTime:castingTime,
      components:components,
      description:description,
      duration:duration,
      level:level,
      target:target
    };
    if(this.editForm.valid){
      this.spellService.edit(this.spell).pipe(
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
