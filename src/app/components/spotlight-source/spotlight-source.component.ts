import { Component ,OnInit, ElementRef, Renderer2, QueryList, AfterViewInit, HostListener} from '@angular/core';
import { faPlus, faClock,faAnglesLeft,faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { ServiceService } from 'src/app/services/service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-spotlight-source',
  templateUrl: './spotlight-source.component.html',
  styleUrls: ['./spotlight-source.component.scss'],
  animations: [ 
    trigger('cardAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('5000ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('5000ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
    

  ],
})
export class SpotlightSourceComponent implements OnInit {
  animateCards = true;
  public faPlus=faPlus;
  public faAnglesLeft=faAnglesLeft;
  public faAnglesRight=faAnglesRight;
  public faClock=faClock;
  spotlight:any[]=[]
  jobPostings: any;;
  private sectionInView = false;
  imageSrc: string='';
  itemsPerPage = 1;
  currentPage = 0;
  hiddeMore= true;
  toggle:boolean=false

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustItemsPerPage();
    
  }
  constructor(private service:ServiceService, private renderer: Renderer2, private elementRef: ElementRef){
  
  }

  ngOnInit(): void {
    this.getGetSpotlight();
    this.adjustItemsPerPage();
  }


  adjustItemsPerPage(){
    const screenWidth = window.innerWidth;

    if (screenWidth < 600) {
      this.itemsPerPage = 1;
    } else if (screenWidth < 780) {
      this.itemsPerPage = 2;
    } else {
      this.itemsPerPage = 4;
    }
  }
 
  processContent(text:string,length=10){
    let arr = text.split(` `)
    if(arr.length > length){
     
      return [arr.slice(0,length).join(` `),true]

    }

    return [text,false]
  }

  handleMoreButtonClick(){
this.toggle = !this.toggle
    

  }
  getJobPostings(){
    this.service.getJobOpportunities().subscribe(
      (response) => {
        // Handle the response, which should be an array of job postings
        this.jobPostings = response.payload;
        
        
        console.log(response)
  
  })}
  
  dateFormat(d:Date){
      d = new Date(d)
      const year = d.getFullYear()
      const month = d.getMonth()+1
      const day = d.getDay()
  
      return `${year}-${month > 9? month :'0'+month}-${day > 9? day :'0'+day}`
  }
  
  getGetSpotlight(){
      this.service.getSpotlight().subscribe(
        (res: any)=>{
          this.spotlight=res.payload
          console.log("spotright",this.spotlight)
          this.spotlight=res.payload.map((p:any) => {
            return {
              ...p,
              date: this.dateFormat(p.date)
            }
          }     
          )
          console.log(this.spotlight)
      
          let date=res.payload.date
  
          if(res.payload && res.payload.date){
            for(let i=0; i<=date.length; i++){
              console.log('en-US', date[i])
            }
          }
        
          
          if (res.payload && Array.isArray(res.payload.date)) {
            const formattedDates = res.payload.date.map((date: string) => {
              const objectDate = new Date(date);
              return objectDate.toLocaleDateString('en-US');
  
              
            }
            
            
            )
            console.log('en-US',formattedDates)
            ;}
    
         
         
  
  
          
        }
      )
  }

  get startIndex(): number {
    return this.currentPage * this.itemsPerPage;
  }
  
  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }
  
  // Function to navigate to the previous page
  prevPage() {
    this.currentPage = Math.max(0, this.currentPage - 1);
  }
  
  // Function to navigate to the next page
  nextPage() {
    const lastPage = Math.ceil(this.spotlight.length / this.itemsPerPage) - 1;
    this.currentPage = Math.min(lastPage, this.currentPage + 1);
  }
  

}
