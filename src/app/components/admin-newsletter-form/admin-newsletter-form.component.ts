import { Component,OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder } from '@angular/forms';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-admin-newsletter-form',
  templateUrl: './admin-newsletter-form.component.html',
  styleUrls: ['./admin-newsletter-form.component.scss']
})
export class AdminNewsletterFormComponent implements OnInit {
  public faCircleDot=faCircleDot
  formData={
    title: '',
    message: '',
    image: null as File | null
    } 

  constructor(private http: ServiceService, private formbuilder: FormBuilder){
   
  }
  

  ngOnInit(): void {
    
  }

  onSubmit() {
  
    this.http.postSpotNews(this.formData).subscribe(
      res =>{
        console.log(res)
      }
    )

      
  }
  
  
  onFileChange(event: Event) {
    const input=event.target as HTMLInputElement;

    if(input.files && input.files.length){
      this.formData.image = input.files[0];
        
    }
  }
  
}
