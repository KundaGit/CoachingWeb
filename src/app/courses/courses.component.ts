import { Component } from '@angular/core';
import { CourseCardComponent } from "../shared/components/course-card/course-card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCardComponent, CommonModule,FormsModule],
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
        video: 'https://www.youtube.com/embed/2Vv-BfVoq4g'
      },
      {
        name: 'Polynomials',
        free: true,
        video: 'https://www.youtube.com/embed/watch?v=1muJQdq6VV8&list=RD1muJQdq6VV8&start_radio=1'
      },
      {
        name: 'Linear Equations',
        free: false,
        video: 'https://www.youtube.com/embed/ysz5S6PUM-U'
      },
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
        { name: 'Life Processes', free: false },
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
        { name: 'Coordinate Geometry', free: false },
      ]
    }
  ];
}
