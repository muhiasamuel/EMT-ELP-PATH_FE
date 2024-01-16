import { Component,OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder } from '@angular/forms';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-admin-sportlight-form',
  templateUrl: './admin-sportlight-form.component.html',
  styleUrls: ['./admin-sportlight-form.component.scss']
})
export class AdminSportlightFormComponent implements OnInit {
  public faCircleDot=faCircleDot
  formData={
    title: '',
    content: '',
    image: null as File | null
    } 

  constructor(private http: ServiceService, private formbuilder: FormBuilder){
   
  }
  

  ngOnInit(): void {
    
  }

  onSubmit() {
  
    this.http.postSpotlight(this.formData).subscribe(
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
  
  


