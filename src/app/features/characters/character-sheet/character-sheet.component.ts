import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Character } from '../interfaces/character';
import { CharacterService } from '../service/character.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HitDice } from '../../../shared/enums/hit-dice';
import { Proficiency } from '../../../shared/interfaces/proficiency';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { ProficiencyService } from '../../../shared/services/proficiency-service/proficiency.service';
import { ProficiencyFilter } from '../../../shared/filters/proficiency-filter';
import { Sort } from '../../../core/sort';
import { ProficiencyDegree } from './proficiency-degree';
import { CharacterProficiency } from '../interfaces/character-proficiency';
import { MatSelectModule } from '@angular/material/select';
import { publishFacade } from '@angular/compiler';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule, MatIconModule,
    MatCardModule, MatLabel, MatInputModule, MatListModule,
    FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent implements OnInit{
  protected character:Character|null;
  protected maxHealth:number=0;
  protected weapons:Proficiency[]=[];
  protected armors:Proficiency[]=[];
  protected skills:Proficiency[]=[];
  protected languages:Proficiency[]=[];
  protected tools:Proficiency[]=[];
  constructor(private characterService:CharacterService,
    private route:ActivatedRoute, private router:Router,
    private proficiencyService:ProficiencyService
  ) {
    this.character=null;
  }
  ngOnInit(): void {
    this.characterService.getById(Number(this.route.snapshot.params['id'])).subscribe(
      response=>{
        this.character=response.body!;
        this.setMaxHealth();
        this.armors=this.character.dndClass.proficiencies.filter(x=>x.type==='Armor');
        this.weapons=this.character.dndClass.proficiencies.filter(x=>x.type==='Weapon');
        this.languages=this.character.dndClass.proficiencies.filter(x=>x.type=='Language');
        this.tools=this.character.dndClass.proficiencies.filter(x=>x.type=='Tools');
      }
    );
    let filter:ProficiencyFilter={
      name:'',
      type:'Skill'
    };
    let sort:Sort={
      sortBy:'name',
      ascending:true
    };
    this.proficiencyService.getAll(sort,filter).subscribe(
      response=>{
        this.skills=response.body??[];
      }
    );
  }

  integerDelete(x:number,y:number):number{
    return (x)/y -
            (x)%y/y;
  }

  setMaxHealth():void{
    let bonusHealth:number=this.character!.level*this.integerDelete((this.character!.baseCon-10),2);;
    switch (this.character?.dndClass.hitDice) {
      case HitDice.D6:
        this.maxHealth=6+(this.character.level-1)*4;
        break;
        
      case HitDice.D8:
        this.maxHealth=8+(this.character.level-1)*5;
      break;
      
      case HitDice.D10:
        this.maxHealth=10+(this.character.level-1)*6;
        break;

      case HitDice.D12:
        this.maxHealth=12+(this.character.level-1)*7;
        break;
    
      default:
        break;
    }
    this.maxHealth+=bonusHealth;
  }

  levelUp():void{
    let level:number|undefined=this.character?.level??0;
    if (level>0 && level<20) {
      this.character!.level=level+1;
    }
    this.setMaxHealth();
  }

  getProfDegree(proficiency:Proficiency):ProficiencyDegree{
    let skill:CharacterProficiency|undefined
      =this.character?.proficiencies
      .find(x=>x.proficiency.id===proficiency.id);
    if(skill===undefined){
     return ProficiencyDegree.NONE;
    }
    else{
      if (skill.expertise) {
        return ProficiencyDegree.EXPERT;
      } else {
        return ProficiencyDegree.PROFICIENT;
      }
    }
  }

  setProfDegree(proficiency:Proficiency, degree:ProficiencyDegree):void{
    let skill:CharacterProficiency|undefined
      =this.character?.proficiencies
      .find(x=>x.proficiency.id===proficiency.id);
      if (skill===undefined){
        let characterProficiency:CharacterProficiency={
          proficiency:proficiency,
          expertise:false
        };
        if (degree===ProficiencyDegree.EXPERT) {
          characterProficiency.expertise=true;
        }
        this.character?.proficiencies.push(characterProficiency);
      }else {
        let index:number|undefined=this.character?.proficiencies.indexOf(skill!);
        switch (degree) {
          case ProficiencyDegree.NONE:
            this.character?.proficiencies.splice(index!,1);
            return;

          case ProficiencyDegree.PROFICIENT:
                skill.expertise=false;
              break;

          case ProficiencyDegree.EXPERT:
              skill.expertise=false;
            break;
        
          default:
            break;
        }
        this.character?.proficiencies.splice(index!,1,skill);
      }
  }

  back():void{
    this.router.navigateByUrl('/characters/'+this.character!.user.id);
  }

  save():void{
      if (this.character===null) {
        alert('Character does not exist anymore!');
      } else {
        this.characterService.edit(this.character);
        this.back();
      }
  }
}

