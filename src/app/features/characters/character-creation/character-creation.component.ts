import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper'
import { ClassService } from '../../../shared/services/class-service/class.service';
import { SpellService } from '../../../shared/services/spell-service/spell.service';
import { DndClass } from '../../../shared/interfaces/dnd-class';
import { Spell } from '../../../shared/interfaces/spell';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { HitDice } from '../../../shared/enums/hit-dice';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Proficiency } from '../../../shared/interfaces/proficiency';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-character-creation',
  standalone: true,
  imports: [MatButtonModule, MatStepperModule,
     MatFormFieldModule, MatInputModule, MatSelectModule,
    FormsModule, CommonModule, ReactiveFormsModule,
  MatCardModule, MatListModule, MatCheckboxModule,
  MatIconModule],
  templateUrl: './character-creation.component.html',
  styleUrl: './character-creation.component.css'
})
export class CharacterCreationComponent implements OnInit{
  protected checked:boolean=false;
  protected disabled:boolean=true;

  protected strength:number=8;
  protected dexterity:number=8;
  protected constitution:number=8;
  protected intelligence:number=8;
  protected wisdom:number=8;
  protected charisma:number=8;

  protected spellLevel;
  protected spellName:string=''

  protected weapons:Proficiency[]=[];
  protected armors:Proficiency[]=[];
  protected skills:Proficiency[]=[];
  protected languages:Proficiency[]=[];
  protected tools:Proficiency[]=[];
  protected proficiencies:Proficiency[]=[];
  protected nameList:string[]=[];


  selectedClass:DndClass={
    name:'',
    hitDice:HitDice.NONE,
    description:'',
    proficiencies:[]
  };
  classList:DndClass[]=[];
  spellList:Spell[]=[];
  createFormGroup: FormGroup;
  
  constructor (private classService:ClassService,
    private spellService:SpellService, fb:FormBuilder,
    route:ActivatedRoute
  ){
    this.spellLevel=0;
    const id=Number(route.snapshot.params['id']);
    this.createFormGroup =fb.group({
      strength: [8, [Validators.required]],
      dexterity: [8, Validators.required],
      constitution: [8, Validators.required],
      intelligence: [8, Validators.required],
      wisdom: [8, Validators.required],
      charisma: [8, Validators.required],
      dndClass: [
        {
          name:'',
          hitDice:HitDice.NONE,
          description:'',
          proficiencies:[]
        },
        Validators.required],
      spells: [[], Validators.required],
      name:['',Validators.required],
      level:[1,[Validators.required,Validators.min(1),Validators.max(20)]]
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

  loadDndClass(){
    this.selectedClass=this.classList.find(x=>x.name===this.selectedClass.name)??{
      name:'',
      hitDice:HitDice.NONE,
      description:'',
      proficiencies:[]
    };
    this.armors=this.selectedClass.proficiencies.filter(x=>x.type==='Armor');
    this.weapons=this.selectedClass.proficiencies.filter(x=>x.type==='Weapon');
    this.skills=this.selectedClass.proficiencies.filter(x=>x.type==='Skill');
    this.languages=this.selectedClass.proficiencies.filter(x=>x.type=='Language');
    this.tools=this.selectedClass.proficiencies.filter(x=>x.type=='Tools');
  }

  addProf(proficiency:Proficiency):void{
    if(this.proficiencies.filter(x=>x.id===proficiency.id).length===0){
      this.proficiencies.push(proficiency);
    }
    else{
      this.proficiencies=this.proficiencies.filter(x=>!(x.id===proficiency.id));
    }
  }

  setLevel():void{
    let spells:Spell[]=this.spellList.filter(x=>x.level.toString()===this.spellLevel.toString());

    this.nameList=spells.flatMap(x=>x.name);
    this.nameList=this.removeDuplicates(this.nameList);
  }

  removeDuplicates(list:any[]):any[]{
    return list.filter((el, i, a) => i === a.indexOf(el));
  }

  submit():void {
    alert("Not implemented!");
  }

  setName():void{
    this.disabled=false;
  }

  addSpell():void{
    let spell=this.spellList.find(x=>x.name===this.spellName
      && this.spellLevel.toString()===x.level.toString()
    );
    let spells=this.createFormGroup.controls['spells'].value;
    spells.push(spell);
    this.createFormGroup.controls['spells'].setValue(spells);
    this.spellList=this.spellList.filter(x=>!(x.id===spell?.id));
    this.reset();
  }

  remove(spell:Spell):void{
    this.spellList.push(spell);
    let spells:Spell[]=this.createFormGroup.controls['spells'].value;
    spells=spells.filter(x=>!(x.id===spell.id));
    this.createFormGroup.controls['spells'].setValue(spells);
    this.reset();
  }

  private reset():void{
    this.spellLevel=0;
    this.spellName='';
    this.disabled=true;
    let spells:Spell[]=this.spellList.filter(x=>x.level.toString()===this.spellLevel.toString());

    this.nameList=spells.flatMap(x=>x.name);
    this.nameList=this.removeDuplicates(this.nameList);

    
  }
}
