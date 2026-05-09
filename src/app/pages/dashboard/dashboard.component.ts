import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
userEmail = '';
purchasedCourses:any[] = [];

constructor(private router: Router) {
  
}
courses = [
    { title: 'Class 10 Maths', slug: 'class-10-maths' },
    { title: 'Class 10 Science', slug: 'class-10-science' },
    { title: 'Class 9 Maths', slug: 'class-9-maths' }
  ];
ngOnInit() {
   this.userEmail = localStorage.getItem('userEmail') || '';

    // ✅ check purchased
    this.purchasedCourses = this.courses.filter(c =>
      localStorage.getItem(`isPaid_${c.slug}`) === 'true'
    );
  }


  getScore(slug: string) {
  return localStorage.getItem(`quiz_${slug}`) || '0';
}
continueCourse(slug: string) {
  this.router.navigate(['/courses'], {
    queryParams: { resume: slug }
  });
}


}


