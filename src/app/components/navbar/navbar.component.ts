import { Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, finalize, of, switchMap } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { SearchSuggestion } from 'src/app/services/search-suggestion model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy {
  private searchText$ = new Subject<string>();
  searchControl = new FormControl();
  searchPerformed: boolean = false;
  searchResults: SearchSuggestion[] = [];
  filteredWords: SearchSuggestion[] = [];
  isLoading: boolean=false;
  selectedSuggestion!: string;
  spinnerMode: 'determinate' | 'indeterminate' = 'indeterminate';
  private currentSearchValue: string = '';


  truncateSuggestion(suggestion: string, keyword: string): string {
    const words = suggestion.split(/\s+/);
    const keywordIndex = words.findIndex(word => word.toLowerCase().includes(keyword.toLowerCase()));

    let start = keywordIndex - 5 >= 0 ? keywordIndex - 5 : 0;
    let end = start + 10 >= words.length ? words.length : start + 10;

    if (end - start < 10) {
      start = end - 10 >= 0 ? end - 10 : 0;
    }

    return words.slice(start, end).join(' ') + (end < words.length ? '...' : '');
  }

  constructor(private router: Router,
    private service: SearchService,
    private snackbar: MatSnackBar,
    private eRef:ElementRef,

    ) {
      this.searchText$.pipe(
        debounceTime(300),
        switchMap((searchValue) => { 
            if (searchValue) {
  
            return this.service.getFilteredWords(searchValue);
          } else {
            return of([]); 
          }
        }),
        finalize(() => {
        })
        ).subscribe(
          (results: SearchSuggestion[]) => {
            console.log(results);
        
            let limitedResults = results.filter(result => result.content).slice(0, 10);
        
            limitedResults = limitedResults.map(result => ({
              ...result,
              content: this.truncateSuggestion(result.content,  this.currentSearchValue)
            }));
        
            this.filteredWords = limitedResults;
            this.isLoading = false;
        
            if (limitedResults.length === 0 && this.searchPerformed) {
              this.spinnerMode = 'determinate';
              this.showSnackbar('No results found');
            }
          },
          (error) => {
            this.filteredWords = [];
            this.showSnackbar('No search item entered');
            this.spinnerMode = 'determinate';
          }
        );
  
    }
    showSnackbar(message: string) {
      let config = new MatSnackBarConfig();
      config.duration = 2000;
      config.verticalPosition = 'top'; 
      config.horizontalPosition = 'center';
      config.panelClass = 'custom-snackbar'; 
    
      this.snackbar.open(message, 'Close', config);
    }
    @HostListener('document:click', ['$event'])
    clickout(event: MouseEvent) { 
      if (!this.eRef.nativeElement.contains(event.target as Node)) {
        this.filteredWords = []; 
      }
    }
    processLink(text:string){
      return text.replace(/https?:\/\/[^\s]+/g, '').trim();
  
    }
    isLink(text:string){
      const p = /https?:\/\/[^\s]+/g
      return p.test(text)
    }
    onSearchTextEntered(searchValue: string) {
      this.searchPerformed = !!searchValue;
      if (searchValue) {
        // Only start loading if there is a search value
        this.isLoading = true;
        this.spinnerMode = 'indeterminate';
      } else {
        // If the search field is cleared, stop loading and clear results
        this.isLoading = false;
        this.filteredWords = [];
      }
      this.searchText$.next(searchValue);
    }
    
  
    onSuggestionClicked(suggestion: any) {
      console.log('Suggestion clicked:', suggestion);
    
      if (suggestion.type === 'users') {
        const userId = suggestion.id;
        this.router.navigate(['/users', userId]);
      } else {
        // If it's not a user, you might want to handle it differently or do nothing
        console.log('The clicked suggestion is not a user type');
      }
    }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.searchText$.unsubscribe();
  }
}
