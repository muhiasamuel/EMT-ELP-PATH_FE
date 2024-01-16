// checkbox.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckboxService {
  private isCheckedSource = new BehaviorSubject<boolean>(false);
  isChecked$ = this.isCheckedSource.asObservable();

  get isChecked(): boolean {
    return this.isCheckedSource.value;
  }

  set isChecked(value: boolean) {
    this.isCheckedSource.next(value);
  }

  toggleCheckbox(): void {
    this.isChecked = !this.isChecked;
  }
}
