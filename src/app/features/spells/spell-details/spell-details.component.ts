import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SpellService } from '../service/spell.service';
import { Spell } from '../../../shared/interfaces/spell';

@Component({
  selector: 'app-spell-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './spell-details.component.html',
  styleUrl: './spell-details.component.css'
})
export class SpellDetailsComponent  implements OnInit {
  protected spell: Spell|undefined;
  constructor(private spellService:SpellService,
    private route: ActivatedRoute, private router:Router){
  }
  ngOnInit(): void {
    const id=Number(this.route.snapshot.params['id']);
    this.spellService.getById(id).subscribe(response=>{
      this.spell=response.body??undefined;
    });
  }
  openDialog() {
   if(confirm("Are you sure you want to delete this?")) {
     this.delete();
   }
  }
  private delete():void{
    this.spellService.delete(this.spell?.id??0);
    this.router.navigateByUrl('/spells');
  }
}
