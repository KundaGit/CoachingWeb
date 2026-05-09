
import { Component } from '@angular/core';
import { CourseCardComponent } from "../shared/components/course-card/course-card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCardComponent, CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  searchQuery = '';

  get filteredCourses() {
    if (!this.searchQuery) return this.courses;
    return this.courses.filter(c =>
      c.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  expandedSlug: string | null = null;
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const resumeSlug = this.route.snapshot.queryParams['resume'];

  if (resumeSlug) {
    setTimeout(() => {
      const course = this.courses.find(c => c.slug === resumeSlug);
      if (course) {
        // 🔥 open automatically (custom logic)
        // tu isko service ya shared state se trigger kar sakta hai
      }
    }, 500);
  }
}

onCourseOpen(slug: string) {
  this.expandedSlug = slug;
}

  courses = [
    {
      title: 'Class 10 Maths',
      
      description: 'Complete syllabus + tests',
      price: 199,
      teacher: 'PW Faculty',
      duration: '12 Months',
      slug: 'class-10-maths',
      chapters: [
        {
          name: 'Real Numbers',
          free: true,
          video: 'https://www.youtube.com/embed/watch?v=v5jVX0QYwQo&list=RDv5jVX0QYwQo&start_radio=1'
        },
        {
          name: 'Polynomials',
          free: true,
          video: 'https://www.youtube.com/embed/watch?v=EeCaXFKRPZ0&list=RDEeCaXFKRPZ0&start_radio=1'
        },
        {
          name: 'Linear Equations',
          free: false,
          video: 'https://www.youtube.com/embed/ysz5S6PUM-U'
        },
        {
          name: 'Quadratic Equations',
          free: false,
          video: 'https://www.youtube.com/embed/tgbNymZ7vqY'
        },
        {
          name: 'Statistics',
          free: false,
          video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        }
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
        {
          name: 'Light',
          free: true,
          video: 'https://www.youtube.com/embed/watch?v=EeCaXFKRPZ0&list=RDEeCaXFKRPZ0&start_radio=1'
        },
        {
          name: 'Electricity',
          free: false,
          video: 'https://www.youtube.com/embed/tgbNymZ7vqY'
        },
        {
          name: 'Chemical Reactions',
          free: false,
          video: 'https://www.youtube.com/embed/2Vv-BfVoq4g'
        },
        {
          name: 'Life Processes',
          free: false,
          video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        }
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
        {
          name: 'Number Systems',
          free: true,
          video: 'https://www.youtube.com/embed/1muJQdq6VV8'
        },
        {
          name: 'Polynomials',
          free: false,
          video: 'https://www.youtube.com/embed/tgbNymZ7vqY'
        },
        {
          name: 'Coordinate Geometry',
          free: false,
          video: 'https://www.youtube.com/embed/ysz5S6PUM-U'
        }
      ]
    }
  ];
}