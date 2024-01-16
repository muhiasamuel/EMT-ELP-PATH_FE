import { Component, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnChanges {
  // ... other properties

  userProfileData: any;
  feedsData: any[] = [];
  loadingProfileData = false;
  loadingFeedsData = false;
  users: any;
  imageurl!: string;
  constructor(
    private http: HttpServiceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      if (userId) {
        this.getUserDetails(userId);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // If you have any specific logic for changes, you can add it here
  }

  handleError(event: any) {
    event.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAJFBMVEXQ0NDw8PDj4+Pc3NzU1NTn5+fz8/Pt7e3f39/X19fq6urNzc0EuZL3AAADYElEQVR4nO2bCZajIBRFC0EFs//9tomWpZFRUXj2uxvIv+cPMuXnhxBCCCGEEEIIIYQQQgghhBBCCCHkSShjpNZaGlU6ktMY3faieyP6VpaO5hRKjyZiZvQZgHXkILZ0XQtabGNaOvFN12PayJ3Jx2YwpQM7gLTkZbLBy4357pc/4PpGNU4XIdBmmuzdLmiF5k3MmJpX6QBTMIO9+3+7BkrGPpYXsD422psYrBGgmoCMBqoz1QZkGsqU4VkyT+qZ8DRDkgl9Z6C2AZ4185uhdHxJBJoGqmX8q2YBtmoeh7MvMaWjS2V3MvMH3E7TM9CwRtmEY3/W9Ugr5gWlbS5Qq/8Vo833gO4Qa2zGtNus4M2xDaYd+m66BRB9Uzqa0yipm7ZtGg3aLIQQQgghhBBC/hfwThLdSMBzUQdK9qLFPbXaML3Le4jN/MbwETbLu7wH9M3qjSG8jV5fyoFX2tfdArLNa3dPgmvzstzHwfaN7f4KNTdWF1Ab7XpcgGez733cvnl5H32A2ThrDLDSAi5INr5+mYH5n5G/Xxab0mHGEawxoNyEa2y2AXjIFusCYGNbW3psSofrJar3VzZVT4H9y6i6Kk028b+X6nK3jey7aJu4mVzOxrzPViJtXP/1DNjc9r0xU93E2Fj/TxzFTTbytwfCNupYXu7LzSq+oM1xl3tsNt+MgM0ZlztszHbOem3Oubxtrt3fmO9vhtvmRL8sXGpjic9lk8PlUhvrGsthk8XlQhvHetFqk8nlMhtnfBabbC4X2Xji29lkdLnExvPPoJ1NVpcLbAL7q41NZpfsNsG94somu0tmm4j4FpsLXLLaRO3hZ5tLXDLaeHt/a/M6vH+5ySb6bKVRSWdKJWwS9vDNkf3+nTZJZ15XumSwieyXezhpU5XLSZu0c9UbOLGTvuibcYbDNhW6HLaprF9+OXRyW12/zBw5gTI11tiH9FP1KvtlJjU3Nbuk2sjk+6F7Sbn33J1bVke8jelqdxltHlJjE09yiZOpv18molwA+uXDc2pMxMig1JiIkMHJS1gGKC9BGSiXgEyt+xcHT3LxytS95rfgcykdWzIPyotHBq1f3jzJxSUD6eKQwXSxy4C6WGUqPYMNY80L3Eye2bso3aBikcHFMZoJIYQQQgghpHr+AZZ6NU6cNizeAAAAAElFTkSuQmCC"
  }

  getUserDetails(userId: number) {
    if (userId) {
      this.http.getUsers(userId).subscribe({
        next: (response) => {
          console.log('User details response:', response);
          this.users = [response.payload];
          this.userProfileData = response.payload;
          this.getFeeds(userId);
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        }
      });
    }
  }

  getFeeds(userId: number) {
    this.loadingFeedsData = true;
    // const getFeedsUrl = this.http.serverUrl + 'v2/feeds/all';

    const getFeedsUrl = `${this.http.serverUrl}v2/feeds/${userId}/view`;
  
    this.http.getData(getFeedsUrl).pipe(
      finalize(() => this.loadingFeedsData = false)
    ).subscribe({
      next: (response) => {
        console.log('Feeds response:', response);
        this.feedsData = response.payload;
      },
      error: (error) => {
        console.error('Error fetching feeds:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Response body:', error.error);
        }
      },
      complete: () => {},
    });
  }
  

}
