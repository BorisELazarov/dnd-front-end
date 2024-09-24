import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../../profile-management/services/local-storage/local-storage.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const localStorageService:LocalStorageService=inject(LocalStorageService);
  if(localStorageService.getItem("role")==='admin'
    && localStorageService.getItem("deleted")=='false'){
      return true;
  }
  const router:Router=inject(Router);
  router.navigateByUrl('home');
  return false;
};
