import { Component, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-admin-userfeeback',
  templateUrl: './admin-userfeeback.component.html',
  styleUrls: ['./admin-userfeeback.component.scss']
})
export class AdminUserfeebackComponent {
  @ViewChild(MatExpansionPanel) panel!: MatExpansionPanel;
  feed: any[]=[
    {'image':'/assets/images/download4.png', 'name':'Paul Walker',
    'par':'The system is easy to navigate and find the information we need and responds to our input quickly and efficiently'},
    {'image':'/assets/images/download1.jpeg', 'name':'Sheila Chebet',
     'par':'The system is responsive and provides feedback to our actions and can be upgraded to meet increasing demands'},
    {'image':'/assets/images/download2.jpeg', 'name':'Michael Kim', 
    'par':'The system is well-organized and consistent and also protects our data from unauthorized access'},
    {'image':'/assets/images/download3.jpeg', 'name':'Dan Morgan',
     'par':'The system is easy to learn and use and is able to handle unexpected errors gracefully'}
  ]
  preventCollapse(event: Event): void {
      event.stopImmediatePropagation();
  }
}
