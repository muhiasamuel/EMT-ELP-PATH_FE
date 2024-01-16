import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss']
})
export class DashCardComponent {
  @Input() title: string = "Card Title"
  @Input() icon: string = "info"
  @Input() iconColor: string = "black";
  @Input() iconSize: number = 24;
}
