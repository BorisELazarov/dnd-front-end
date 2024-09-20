import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { UsersService } from '../services/user-service/users.service';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent implements OnInit{
  profile:User|undefined;
  constructor(private localStorageService:LocalStorageService,
    private userService:UsersService,private route: ActivatedRoute,
     private router:Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getById(this.localStorageService.getItem("id")??"").subscribe(
      response=>{
        this.profile=response.body??undefined;
      }
    );
  }

  openDialog() {
    if(confirm("Are you sure you want to delete your profile?")) {
      this.delete();
    }
   }
   private delete():void{
     this.userService.delete(this.profile?.id??0).subscribe();
     this.router.navigateByUrl('/login');
   }
}
