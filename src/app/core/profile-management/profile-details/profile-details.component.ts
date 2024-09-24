import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { UsersService } from '../services/user-service/users.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
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
    this.localStorageService.setItem('deleted','false');
    this.userService.restore(this.profile?.id??0).pipe(
      takeUntil(this.destroy)
    ).subscribe(
      ()=>{
        this.router.navigate(['/profile']);
      }
     );
   }

   private delete():void{
    this.userService.confirmDelete(this.profile?.id??0).pipe(
      takeUntil(this.destroy)
    ).subscribe(
      ()=>{
        this.router.navigateByUrl('/login');
      }
    );
   }

   private deactivate():void{
    this.localStorageService.setItem('deleted','true');
     this.userService.delete(this.profile?.id??0).pipe(
      takeUntil(this.destroy)
    ).subscribe(
      ()=>{
     this.router.navigate(['/profile']);
    }
     );
   }

   ngOnDestroy(): void {
     this.destroy.complete();
   }
}
