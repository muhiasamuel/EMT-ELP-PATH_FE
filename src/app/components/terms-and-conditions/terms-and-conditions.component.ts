import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CheckboxService } from 'src/app/services/checkbox.service';


@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent {
  checkboxForm!: FormGroup;
  checkboxSubscription: Subscription | undefined;

  constructor(public checkboxService: CheckboxService, private formBuilder: FormBuilder) {}

  checkCheckbox(): void {
    this.checkboxService.toggleCheckbox();
  }

  ngOnInit(): void {
   
  }
  

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this.checkboxSubscription) {
      this.checkboxSubscription.unsubscribe();
    }
  }
}
