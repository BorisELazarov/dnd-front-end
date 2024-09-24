import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../profile-management/services/local-storage/local-storage.service';
import { inject } from '@angular/core';

export const dataManagerGuard: CanActivateFn = (route, state) => {
  const localStorageService:LocalStorageService=inject(LocalStorageService);
  if(localStorageService.getItem("role")==='data manager'
    && localStorageService.getItem("deleted")=='false'){
      return true;
  }
  const router:Router=inject(Router);
  router.navigateByUrl('home');
  return false;
};
