import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { LocalStorageService } from './core/profile-management/services/local-storage/local-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from "./core/profile-management/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatToolbarRow, MatIcon,
    MatButtonModule, RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private localStorageService:LocalStorageService,
    private router:Router
  ) {
  }
  ngOnInit(): void {
  }
  role():string|undefined{
    return this.localStorageService.getItem("role")??undefined;;
  }
  deleted():boolean|undefined{
    let deleted:boolean|undefined;
    switch (this.localStorageService.getItem("deleted")??undefined) {
      case "false":
        deleted=false;
        break;

      case "true":
        deleted=true;
        break;
      
      default:
        deleted=undefined;
        break;
    }
    return deleted;
  }
  logOut() {
    this.localStorageService.clear();
    this.router.navigate(['login']);
  }

  
}
