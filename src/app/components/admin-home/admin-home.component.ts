import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent {
  logoimg:string ='assets/images/equity-bank-logo.png';
  isShowing!: boolean;

  toggle() {
    if (this.isShowing) {
      return (this.isShowing = false);
    } else {
      return (this.isShowing = true);
    }
  }
}
