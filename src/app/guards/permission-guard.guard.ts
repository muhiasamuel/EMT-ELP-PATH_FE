import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsServiceService } from '../services/permissions-service.service';

export const permissionGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const requiredPermission = route.data['permission'];
  const oauthService: PermissionsServiceService = inject(
    PermissionsServiceService
  );
  if (requiredPermission && !oauthService.hasPermission(requiredPermission)) {
    // Handle unauthorized access here, e.g., redirect to a login page or show a message.
    window.alert('Access Denied');
    return false; // User doesn't have the required permission.
  }
  return true; // User has the required permission.
};
