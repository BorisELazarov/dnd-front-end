import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { Register } from '../interfaces/register';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { UsersService } from '../services/user-service/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSlideToggleModule,
    MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  protected registerForm :FormGroup;
  constructor(private userService: UsersService,
    fb :FormBuilder, private router:Router,
   private localStorageService:LocalStorageService) {
    this.registerForm = fb.group({
      email: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    });
  }

  submit() {
    let email=this.registerForm.controls['email'].value;
    let username=this.registerForm.controls['username'].value;
    let password=this.registerForm.controls['password'].value;
    let confirmPassword=this.registerForm.controls['confirmPassword'].value;
    if(this.registerForm.valid && password===confirmPassword){
      let register:Register={
        email:email,
        username:username,
        password:password,
        role:"user"
      };
      this.userService.register(register).subscribe(user=>{
        if(!(user.id===undefined)){
          this.localStorageService.setItem("id",user.id.toString());
          this.localStorageService.setItem("role",user.role);
          let isDeleted:string="true";
          if (user.isDeleted!==undefined || user.isDeleted===false) {
            isDeleted="false";
          }
          this.localStorageService.setItem("deleted",isDeleted);
          this.router.navigateByUrl('/profile');
        }
      });
    }
    else{
      alert('Invalid input!');
    }
  }
}
