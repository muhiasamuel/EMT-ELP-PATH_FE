import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-chapters',
  templateUrl: './admin-chapters.component.html',
  styleUrls: ['./admin-chapters.component.scss'],
})
export class AdminChaptersComponent {
  dataUrl!: string;
  options: string[] = ['chapterId', 'chapterName'];
  selectedOption: string | null = null;
  showOptionsList: boolean = false;
  instUrl: any[]=[];
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
    // this.getAllChapters();
    this.getChapters()
  }

  // getAllChapters() {
  //   const getChaptersUrl = this.http.serverUrl + 'chapters/all';
  //   //===================get method ========================
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
  getChapters() {
    this.http.getData2().subscribe((res) => {
       this.instUrl = res.chapter;
       this.filteredData = [...res.chapter];
       console.log(res.chapter);
    });
 }
 getChapterById(){}
 getChapterByName(){}
 filterChapter(){}
 
 applyFilter(filterValue: string) {
  filterValue = filterValue.trim().toLowerCase();

  if (this.selectedFilter === 'chapterId') {
    this.filteredData = this.instUrl.filter((chapter: any) => 
      chapter.id.toString() === filterValue
    );
  } else if (this.selectedFilter === 'chapterName') {
    this.filteredData = this.instUrl.filter((chapter: any) => 
      chapter.chapterName.toLowerCase().includes(filterValue)
    );
  }
}


  toggleOptionsList() {
    this.showOptionsList = !this.showOptionsList;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.showOptionsList = false;
  }

  filterOptions(event: any) {
    const searchTerm = event.target.value;
    this.options = this.options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
