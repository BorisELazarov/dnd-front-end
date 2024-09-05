import { Component} from '@angular/core';
import { Proficiency } from '../proficiency';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProficiencyService } from '../service/proficiency.service';

@Component({
  selector: 'app-proficiency-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './proficiency-details.component.html',
  styleUrl: './proficiency-details.component.css'
})
export class ProficiencyDetailsComponent {
  proficiency: Proficiency|undefined;
  constructor(private proficiencyService:ProficiencyService,
    route: ActivatedRoute){
    const id=Number(route.snapshot.params['id']);
    proficiencyService.getById(id).subscribe(response=>{
      this.proficiency=response.body??undefined;
    });
  }
  delete():void{
    this.proficiencyService.delete(this.proficiency?.id??0);
  }
}
