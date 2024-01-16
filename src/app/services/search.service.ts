import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SearchSuggestion } from 'src/app/services/search-suggestion model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  private baseUrl = 'http://52.15.152.26:5555/search';

  navigateToUser(id: number) {
    this.router.navigate(['/users', id]);
  }

  constructor(private http: HttpClient,
    private router: Router) {}
  getFilteredWords(term: string): Observable<SearchSuggestion[]> {
    if (!term.trim()) {
      return of([]);
    }
    const queryParam = encodeURIComponent(term);
    const url = `${this.baseUrl}?q=${queryParam}`;
  
    return this.http.get<{message: string, statusCode: number, success: boolean, payload: SearchSuggestion[]}>(url)
      .pipe(
        map(response => response.success ? response.payload : []),
    catchError(error => {
      console.error('Search service encountered an error:', error);
      return of([]); 
    })
  );
}
  
}
