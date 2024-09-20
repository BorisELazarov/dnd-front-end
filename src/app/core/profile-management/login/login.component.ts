import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UsersService } from '../services/user-service/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSlideToggleModule,
    MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  protected loginForm :FormGroup;
  constructor(private userService: UsersService,
    fb :FormBuilder, private router:Router,
   private localStorageService:LocalStorageService) {
    this.loginForm = fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  submit() {
    let email=this.loginForm.controls['email'].value;
    let password=this.loginForm.controls['password'].value;
    if(this.loginForm.valid){
      this.userService.login(email,password).subscribe(response=>{
        let id=response.body?.id;
        if(!(id===undefined)){
          this.localStorageService.setItem("id",id.toString());
          this.localStorageService.setItem("role",response.body!.role);
          this.router.navigateByUrl('/profile');
        }
      });
    }
    else{
      alert('Invalid input!');
    }
  }
}
