import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { LocalStorageService } from './core/profile-management/services/local-storage/local-storage.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatToolbarRow, MatIcon,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  protected role:string|undefined;
  constructor(private localStorageService:LocalStorageService) {
  }
  ngOnInit(): void {
    
    this.role=this.localStorageService.getItem("role")??undefined;
  }
  title = 'dnd-front-end';
  logOut() {
    this.localStorageService.clear();
    this.role=undefined;
  }

  
}
