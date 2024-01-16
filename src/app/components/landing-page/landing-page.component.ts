import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  QueryList,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import {
  faPlus,
  faClock,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { ServiceService } from 'src/app/services/service.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { HttpServiceService } from 'src/app/services/http-service.service';

type YourItemType = {
  faq: string;
  counts: string;
  isHidden: boolean;
};
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    trigger('count', [
      state('initial', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('final', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('initial => final', animate('1s ease-in-out')),
    ]),

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
export class LandingPageComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  animateCards = true;
  public faPlus = faPlus;
  public faAnglesLeft = faAnglesLeft;
  public faAnglesRight = faAnglesRight;
  public faClock = faClock;
  public panelOpenState: boolean = false;
  public item_nav_hidden: boolean = false;
  jobList: any[] = [1, 2, 3];
  public list: any[] = [
    { img: '/assets/images/landing_page/elimuv22.jpg', width: 15 },
    { img: '/assets/images/landing_page/PAN7953-1-1536x1020.jpg', width: 10 },
    {
      img: '/assets/images/landing_page/pexels-katerina-holmes-5905902-removebg-preview (1).png',
      width: 8,
    },
    { img: '/assets/images/landing_page/dr-mwangi-wtf-2020.jpg', width: 3 },
  ];
  cards: any[] = [
    {
      image: '/assets/images/landing_page/wings-to-fly.png',
      scholar: 'High School Scholarships',
      counts: 55583,
      state: 'initial',
    },

    
    {
      image: '/assets/images/landing_page/elp.png',
      scholar: 'University Scholars',
      counts: 18735,
      state: 'initial',
      color: 'red',
    },

    {
      
      image: '/assets/images/landing_page/download__1_-removebg-preview (1).png',
      scholar: 'TVET Scholars',
      counts: 3471,
      state: 'initial',
      color: 'red',
    },
    {
      image: '/assets/images/landing_page/internship-3833168-3185247-removebg-preview.png',
      scholar: 'Paid Internships',
      counts: 8337,
      state: 'initial',
    },
    {
      image:'/assets/images/landing_page/global-education.png',
      scholar: 'Global Scholarships',
      counts: 857,
      state: 'initial',
    },
  ];
  faqs: YourItemType[] = [
    {
      faq: 'How can I discover job opportunities ?',
      counts:
        ' provides a dedicated job board where you can find part-time jobs, internships, and other employment opportunities tailored to students. Browse listings and apply directly through the platform.',
      isHidden: true,
    },
    {
      faq: ' Is the website free to use?',
      counts:
        'The site is designed to help the ELPs got connected to other ELPs all over the world',
      isHidden: true,
    },
    {
      faq: 'How do I report inappropriate content or behavior on the platform?',
      counts:
        'Your safety is important to us. If you encounter any inappropriate content or behavior, you can report it through our platform. Our moderation team will review and take appropriate action.',
      isHidden: true,
    },
    {
      faq: 'How can I reset my password if I forget it?',
      counts:
        'If you forget your password, simply click on the Forgot Password link on the login page. Well guide you through the process of resetting your password',
      isHidden: true,
    },
  ];



  spotlight: any[] = [];

  jobPostings: any;
  private sectionInView = false;
  imageSrc: string = '';
  itemsPerPage = 4;
  currentPage = 0;
  newsUpate: any[]=[];
  newletter: any;
  fileType!: string;
  fileSize!: string;
  newsLetterData: any;
  pdfUrl: string = '';


  constructor(
    private service: ServiceService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private http: HttpServiceService
  ) {}
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const sectionElement =
      this.elementRef.nativeElement.querySelector('.cards');
    const sectionOffset = sectionElement.getBoundingClientRect().top;

    // You can adjust this offset threshold as needed
    const offsetThreshold = window.innerHeight - 100;

    if (sectionOffset <= offsetThreshold && !this.sectionInView) {
      this.sectionInView = true;
      this.startCountingAnimation();
    }
  }

  ngOnInit(): void {
    this.downloadFile();
    this.getJobPostings();
    this.getGetSpotlight();
    this.getNewsUpdate();
    this.getNewsLetter();
    
  }
  ngAfterViewInit() {
    this.startCountingAnimation();
  }

  isOpen(item: any) {
    item.isHidden = !item.isHidden;
  }
  getJobPostings() {
    this.service.getJobOpportunities().subscribe((response) => {
      // Handle the response, which should be an array of job postings
      this.jobPostings = response;

      console.log(response);
    });
  }

  dateFormat(d: Date) {
    d = new Date(d);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDay();

    return `${year}-${month > 9 ? month : '0' + month}-${
      day > 9 ? day : '0' + day
    }`;
  }

  getGetSpotlight() {
    this.service.getSpotlight().subscribe((res: any) => {
      this.spotlight = res.payload.map((p: any) => {
        return {
          ...p,
          date: this.dateFormat(p.date),
        };
      });
      console.log(this.spotlight);

      let date = res.payload.date;

      if (res.payload && res.payload.date) {
        for (let i = 0; i <= date.length; i++) {
          console.log('en-US', date[i]);
        }
      }

      if (res.payload && Array.isArray(res.payload.date)) {
        const formattedDates = res.payload.date.map((date: string) => {
          const objectDate = new Date(date);
          return objectDate.toLocaleDateString('en-US');
        });
        console.log('en-US', formattedDates);
      }
    });
  }

  getNewsUpdate(){
    this.service.getNewsData().subscribe(
      (res)=>{
        this.newsUpate=res.payload;
  
      }
    )
  }

  downloadFile(): void {
    this.loading = true; // Set loading to true when starting the download

    this.service.GetdownloadFile(18).subscribe({
      next: (res: Blob) => {
        this.loading = false; // Set loading to false when the download is complete
        this.pdfUrl = URL.createObjectURL(res);
        const blobUrl = URL.createObjectURL(res);
        console.log("pddfff"+blobUrl)

        window.open(blobUrl, '_blank');
      },
      error: (error) => {
        this.loading = false; // Set loading to false if there's an error during the download
        console.error('Error downloading file:', error);
      },
      complete: () => {}
  });
  }
    getNewsLetter(){
      this.service.getNewsLetter(18).subscribe(
        (res)=>{
          this.newsLetterData=res.payload
          console.log('newsletter',this.newsLetterData )

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

  startCountingAnimation() {
    this.cards.forEach((item, index) => {
      const countElement = document.getElementsByClassName('counts')[index];
      const finalValue = item.counts;
      this.animateCountUp(countElement, finalValue, 1000); // Adjust the duration as needed
    });
  }

  animateCountUp(element: Element, finalValue: number, duration: number) {
    const startTime = Date.now();
    const initialValue = 1;
    const interval = 1000 / 60; // 60 frames per second

    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        const count = Math.floor(
          initialValue + progress * (finalValue - initialValue)
        );
        this.renderer.setProperty(element, 'textContent', count);
        setTimeout(animate, interval);
      } else {
        this.renderer.setProperty(element, 'textContent', finalValue);
      }
    };

    animate();
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
