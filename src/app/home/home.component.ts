import { Component } from '@angular/core';
import { CourseCardComponent } from '../shared/components/course-card/course-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourseCardComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
testClick() {
  alert('CLICK WORKING');
}

currentSlide = 0;
intervalId: any;

banners = [
 'assets/banner1.png',
  'assets/banner2.png',
  'assets/banner3.png',
];

ngOnInit() {
  this.intervalId = setInterval(() => {
    this.currentSlide =
      (this.currentSlide + 1) % this.banners.length;
  }, 4000);
}

ngOnDestroy() {
  clearInterval(this.intervalId);
}

goToSlide(index: number) {
  this.currentSlide = index;
}

}
