import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionsServiceService {
  public userPermissions: string[] = [];
  constructor() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parseData = JSON.parse(userData);
      this.userPermissions = parseData.role.permissions;
    }
  }

  hasPermission(permission: string): boolean {
    // return true;
    return this.userPermissions.includes(permission);
  }
}
