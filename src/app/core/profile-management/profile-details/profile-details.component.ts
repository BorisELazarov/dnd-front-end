import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { UsersService } from '../services/user-service/users.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent implements OnInit, OnDestroy{
  profile:User|undefined;
  private destroy = new Subject<void>();
  constructor(private localStorageService:LocalStorageService,
    private userService:UsersService, private router:Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getById(this.localStorageService.getItem("id")??"").pipe(
      takeUntil(this.destroy)
    ).subscribe(
      response=>{
        this.profile=response.body??undefined;
      }
    );
  }

  protected openDialog() {
    let message="";
    if (this.profile?.isDeleted) {
      message="Are you sure you want to delete your profile for good?";
    } else {
      message="Are you sure you want to deactivate your profile?";
    }
    if(confirm(message)) {
      if (this.profile?.isDeleted) {
        this.delete();
      } else {
        this.deactivate();
      }
    }
   }

   protected restore():void{
    this.userService.restore(this.profile?.id??0).pipe(
      takeUntil(this.destroy)
    ).subscribe(
      ()=>{
        this.localStorageService.setItem('deleted','false');
        this.router.navigateByUrl('/profile');
      }
     );
   }

   private delete():void{
    this.userService.confirmDelete(this.profile?.id??0).pipe(
      takeUntil(this.destroy)
    ).subscribe();
    this.localStorageService.clear();
    this.router.navigateByUrl('/login');
   }

   private deactivate():void{
     this.userService.delete(this.profile?.id??0).pipe(
      takeUntil(this.destroy)
    ).subscribe(
      ()=>{
        this.localStorageService.setItem('deleted','true');
        this.router.navigateByUrl('/profile');
      }
     );
   }

   ngOnDestroy(): void {
     this.destroy.next();
     this.destroy.complete();
   }
}
