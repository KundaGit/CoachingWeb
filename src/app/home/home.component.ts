import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseCardComponent } from '../shared/components/course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { AiChatComponent } from "../ai-chat/ai-chat.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourseCardComponent, CommonModule, AiChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  testClick() {
    this.showStatsModal = true;
    this.animateStats();
  }

  constructor(private router:Router) {}

  currentSlide = 0;
  intervalId: any;
  showStatsModal=false;
  stats = [
  { icon: '👨‍🎓', end: 500, current: 0, label: 'Students Enrolled' },
  { icon: '📚', end: 10, current: 0, label: 'Courses Available' },
  { icon: '⭐', end: 98, current: 0, label: '% Success Rate' },
  { icon: '🏆', end: 150, current: 0, label: 'Quiz Completed' }
];

animateStats() {
  this.stats = this.stats.map(s => ({ ...s, current: 0 }));
  
  this.stats.forEach((stat, i) => {
    let count = 0;
    const increment = Math.ceil(stat.end / 50);
    const interval = setInterval(() => {
      count += increment;
      if (count >= stat.end) {
        count = stat.end;
        clearInterval(interval);
      }
      this.stats[i] = { ...this.stats[i], current: count };
    }, 30);
  });
}

closeModal() {
  this.showStatsModal = false;
  this.router.navigate(['/courses']);
}

  banners = [
    'assets/banner1.png',
    'assets/banner2.png',
    'assets/banner3.png',
    'assets/banner4.png',
    'assets/banner5.png',
    'assets/banner6.png',
    'assets/B1.png'
  ];

  // ✅ Courses data add kiya
  courses = [
    {
      title: 'Class 10 Maths',
      description: 'Complete syllabus + tests',
      price: 199,
      teacher: 'PW Faculty',
      duration: '12 Months',
      slug: 'class-10-maths',
      chapters: [
        { name: 'Real Numbers', free: true },
        { name: 'Polynomials', free: false },
        { name: 'Linear Equations', free: false },
        { name: 'Quadratic Equations', free: false },
        { name: 'Statistics', free: false }
      ]
    },
    {
      title: 'Class 10 Science',
      description: 'Physics, Chemistry, Biology',
      price: 199,
      teacher: 'PW Faculty',
      duration: '12 Months',
      slug: 'class-10-science',
      chapters: [
        { name: 'Light', free: true },
        { name: 'Electricity', free: false },
        { name: 'Chemical Reactions', free: false },
        { name: 'Life Processes', free: false }
      ]
    },
    {
      title: 'Class 9 Maths',
      description: 'Complete syllabus + tests',
      price: 149,
      teacher: 'PW Faculty',
      duration: '12 Months',
      slug: 'class-9-maths',
      chapters: [
        { name: 'Number Systems', free: true },
        { name: 'Polynomials', free: false },
        { name: 'Coordinate Geometry', free: false }
      ]
    }
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