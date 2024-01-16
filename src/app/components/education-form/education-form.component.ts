import { Component, ViewChild, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss'],
})
export class EducationFormComponent {
  // @ViewChild('eduform', { static: false }) eduform!: NgForm;
  course!: string;
  userId!: string;
  educationId!: any;
  institutionId: any;
  courseId!: any;
  userData!: any;
  eduForm!: FormGroup;
  isChecked: boolean = true;
  urlGetInstitution!: string;
  urlGetCluster!: string;
  urlGetClusterCourse!: string;
  institutionOptions!: any[];
  loadedInstitutions = 20;
  loadMore = true;
  courses!: any[];
  clusters!: any[];
  grades: string[] = ['First Class Honors', 'Scond Class Honors Upper D'];
  grade: any;
  clusterOptions!: any[];
  courseOptions!: any[];
  loading: boolean = true;
  ongoing: boolean = false;
  selectedYearOfStudy: any;
  selectedSemester: any;

  //year of study
  years: string[] = ["1", "2", "3", "4", "5"];
  sessions: string[] = ["Semester One", "Semester Two", "Semester Three"];
  items: any[] = [
    {"value":"Yes", "item": true},
    {"value":"No", "item": false}
  ]

  constructor(
    private fb: FormBuilder,
    private http: HttpServiceService,
    public dialogRef: MatDialogRef<EducationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationsService
  ) {
    // Create a reactive form using FormBuilder
    this.eduForm = this.fb.group({
      school_name: ['', Validators.required],
      clusters: [''],
      course: ['', Validators.required],
      grade: ['', Validators.required],
      start_date: ['', Validators.required],
      completion_date: ['', Validators.required],
      yearOfStudy: ['', Validators.required],
      semester: [''],
      stillLearning: ['']
    });
  }

  url!: string;
  ngOnInit() {
    this.getInstitution();
    this.getCluster();
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData)
      this.userId = this.userData.id;
      // Use the parsed data in your application
    }
  }

  // Fetch Institution data from the server
  getInstitution() {
    this.urlGetInstitution = this.http.serverUrl + 'education/universities/all'; // URL to fetch insitiutuion data
    this.http.getData(this.urlGetInstitution).subscribe({
      next: (response) => {
        console.log('Universities', response);
        this.institutionOptions = response.payload; // Set Institution options array
        console.log('Institution ', this.institutionOptions);
      },
      error: (error) => {
        console.log('Error:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onCourseSelectionChange(event: any): void {
    const selectedCourseId = this.eduForm.get('course')?.value;
    this.courseId = selectedCourseId
    console.log('Selected Course ID:', selectedCourseId);
  }

  onGradeSelectionChange(event: any): void {
    const selectedGrade = this.eduForm.get('grade')?.value;
     this.grade = selectedGrade;
     console.log("selected grade:" +this.grade)
  }

  onInstitutionSelectionChange(event: any): void {
    const selectedInstitutionId = this.eduForm.get('school_name')?.value.id;
    // Use selectedInstitutionId as needed
    this.institutionId = selectedInstitutionId
    console.log('Selected Institution ID:', selectedInstitutionId);
  }

  onYearOfStudyChange(event: any): void {
    const yrOfStudy = this.eduForm.get('yearOfStudy')?.value;
    this.selectedYearOfStudy = yrOfStudy;
  }

  onSemesterSelectionChange(event: any): void {
    const selectedSem = this.eduForm.get('semester')?.value;
    this.selectedSemester = selectedSem;
  }

  onStillLearningChange(event: any): void {
    this.ongoing = this.eduForm.get('stillLearning')?.value
  }

  getCluster() {
    // Set the URL to fetch cluster data
    this.urlGetCluster = this.http.serverUrl + 'education/course-clusters/all';

    // Send an HTTP GET request to fetch cluster data
    this.http.getData(this.urlGetCluster).subscribe({
      next: (response) => {
        // When the request is successful, store the cluster data in the 'clusterOptions' variable
        this.clusterOptions = response.payload;
        console.log('Cluster ', this.clusterOptions);
      },
      error: (error) => {
        // Handle and log any errors that occur during the request
        console.log('Error:', error);
      },
      complete: () => {},
    });
  }

  getCourses() {
    // Log the selected cluster ID from a form
    const selectedCluster = this.clusterOptions.find(cluster => cluster.id === this.eduForm.value.clusters);

    if(selectedCluster) {
      console.log('CLuster ID', selectedCluster.id);

      // Get the selected cluster ID from the form and convert it to a string
      const clusterId = selectedCluster.id;
  
      // Call the 'getClusterCourse' function to fetch course data for the selected cluster
      this.getClusterCourse(clusterId.toString());
    }
  }

  getClusterCourse(clusterId: string) {
    // Set the URL to fetch course data for the selected cluster
    const urlGetClusterCourses =
      this.http.serverUrl + `education/course-clusters/${clusterId}`;

    // Send an HTTP GET request to fetch course data for the selected cluster
    this.http.getData(urlGetClusterCourses).subscribe({
      next: (response) => {
        // When the request is successful, store the course data in the 'courseOptions' variable
        this.courseOptions = response.payload.courses;

        // Update the 'courses' variable with the course options
        this.courses = this.courseOptions;
        console.log('Courses ', this.courses);
      },
      error: (error) => {
        // Handle and log any errors that occur during the request
        console.log('Error:', error);
      },
      complete: () => {},
    });
  }

  submit() {
    console.log('Form Submitted !', this.eduForm.value);
    const object = {
      grade: this.grade,
      startDate: this.eduForm.value.start_date || null,
      endDate: this.eduForm.value.completion_date || null,
      ongoing: this.ongoing || null,
      yearOfStudy: this.selectedYearOfStudy || null,
      semester: this.selectedSemester || null
    }
    console.log("data"+JSON.stringify(object)+" ,userId: "+this.userId+" instituId: "+this.institutionId+" courseId"+this.courseId)
    this.url = this.http.serverUrl + 'education/' + this.userId +"/"+this.institutionId+"/"+this.courseId+ '/create';

    this.http.postData(this.url, object).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
        console.log(this.eduForm.value);
        // Handle the response data here
        // localStorage.setItem('token', JSON.stringify(response));
        this.dialogRef.close();
        this.notificationService.alertSuccess(response.message)
      },
      error: (error) => {
        console.log('Error:', error);
        this.notificationService.alertWarning(error.error.message)
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
