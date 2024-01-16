import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-regional-chapters',
  templateUrl: './admin-regional-chapters.component.html',
  styleUrls: ['./admin-regional-chapters.component.scss']
})
export class AdminRegionalChaptersComponent {
  dataUrl: any[]=[];
  data: any;
  filteredData: any[] = [];
  
  constructor(public http: HttpServiceService,     private fb:FormBuilder,
    ) {}

  chapterData: any[] = [];
  filterform!: FormGroup;
  filteredChapterData: any[] = [];
  filterText: string = '';
  selectedFilter: string = '';
  selected='';
  showFilterInput: boolean = false;
 

  ngOnInit() {
    this.filterform=this.fb.group({
    chapterId: ["",[Validators.required]],
    chapterName: ["",[Validators.required]],
    })
    this.getAllChapters();
    // this.getChapters()
  }

  // method to get all chapters
  getAllChapters() {
    this.http.getData1().subscribe((res) => {
       this.dataUrl = res.chapter;
       this.filteredData = [...res.chapter];
       console.log(res.chapter);
    });
 }
 
  // getChapters(){
  //   const getChaptersUrl = this.http.serverUrl + 'chapters/all'; // Modify the URL accordingly
  //   this.http.getData(getChaptersUrl).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       this.chapterData = response.map((item: any) => ({
  //         chapterName: item.chapterName,
  //         chapterDescription: item.chapterDescription,
  //         imageUrl:
  //           item.chapterImage !== null
  //             ? 'data:' +
  //               item.chapterImage.type +
  //               ';base64,' +
  //               item.chapterImage.data
  //             : null,
  //         // chapterType: item.chapterType.chapterTypeName,
  //         // chapterId: item.id.toString(),
  //       }));
  //       console.log(this.chapterData);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //     complete: () => {},
  //   });
  // }
  getChapterById(){}
  getChapterByName(){}
  filterChapter(){}
  


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
  
    if (this.selectedFilter === 'chapterId') {
      this.filteredData = this.dataUrl.filter((chapter: any) => 
        chapter.id.toString() === filterValue
      );
    } else if (this.selectedFilter === 'chapterName') {
      this.filteredData = this.dataUrl.filter((chapter: any) => 
        chapter.chapterName.toLowerCase().includes(filterValue)
      );
    }
  }
  
  
  
  
  

}

