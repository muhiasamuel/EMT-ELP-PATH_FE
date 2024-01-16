import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { surveyService } from 'src/app/services/survey.service';
import { Validator, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { institution } from 'src/assets/json_files/institutions';
import { region } from 'src/assets/json_files/regions';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-survey',
  templateUrl: './admin-survey.component.html',
  styleUrls: ['./admin-survey.component.scss']
})
export class AdminSurveyComponent {
  // recipient: string = '';
  subject: string = '';
  message: string = '';
  surveyform!: FormGroup;

  institutional = institution
  regional = region
  


  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private SurveyService: surveyService,
    private toastr: ToastrService) { 
      this.surveyform = this.fb.group({
        institutional: new FormControl(''),
        regional: new FormControl(''),
        subject: new FormControl(''),
        message: new FormControl('')
      });
    }

  sendSurvey() {
    if (this.surveyform.valid){
    const { regional, institutional, subject, message} = this.surveyform.value;
    const institute = institutional === 'institutional' ? this.surveyform.value.institutional : null;
    const regions = regional === 'regional' ? this.surveyform.value.regional : null;
    const data: any = {
      institute,
      regions,
      subject,
      message
    }

    this.SurveyService.sendSurvey(data)
      .subscribe(
        response => {
          console.log('Survey sent successfully!', response);
          this.toastr.success('Survey sent successfully!', 'Success');
        
        },
        error => {
          console.error('Error sending survey:', error);
          this.toastr.error('Error sending survey:', 'Error');
        
        }
      );
  }
 else{
  this.toastr.error('Please fill out all the required fields.', 'Validation Error');
    }
}
}
