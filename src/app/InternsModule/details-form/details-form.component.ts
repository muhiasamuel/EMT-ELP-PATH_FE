import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrl: './details-form.component.scss'
})
export class DetailsFormComponent implements OnInit{
  selectedOption: any;
  options = ["Year 1", "Year 2", "Year 3", "Year 4"];
  myForm!: FormGroup;
  currentYear!: number;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
      this.detailsForm();
      this.currentYear = new Date().getFullYear();
  }

  onSelectionChange() {
    console.log("Selected year: "+this.selectedOption);
  }

  detailsForm() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.maxLength(10)]],
      institutionName: ['', Validators.required],
      yearOfStudy: ['', Validators.required],
      courseName: ['', Validators.required],
      homeBranch: ['', Validators.required],
      selectionYear: ['', [Validators.required, Validators.maxLength(4)]],
    });
  }


  // form control getters
  get email() {return this.myForm.get('email')}
  get phoneNo() {return this.myForm.get('phoneNo')};
  get institutionName() { return this.myForm.get('phoneNummber')};
  get yearOfStudy() { return this.myForm.get('yearOfStudy')};
  get homeBranch() { return this.myForm.get('homeBranch')};
  get courseName() {return this.myForm.get('courseName')};
  get selectionYear() { return this.myForm.get('selectionYear')};
}
