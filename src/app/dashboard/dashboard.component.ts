import { Component, ElementRef } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const ps = new PerfectScrollbar(this.elementRef.nativeElement.querySelector('.scroll-container'));
  }
}
