import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(    
    ){
      this.searchControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        this.searchTextChanged.emit(value);
      });
    }

  ngOnInit(): void {
  }
  

  enteredSearchValue: string='';
  @Output()searchTextChanged: EventEmitter<string>= new EventEmitter<string>();
searchControl=new FormControl();

onSearchTextChanged(){
  this.searchTextChanged.emit(this.enteredSearchValue);
}
onSuggestionSelected(selectedSuggestion: string) {
  this.searchTextChanged.emit(selectedSuggestion);
}

}
