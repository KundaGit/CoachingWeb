import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  

  // Stats
  stats = {
    totalStudents: 0,
    totalRevenue: 0,
    totalCourses: 3,
    paidStudents: 0
  };

  // Students list (baad mein backend se aayega)
  students = [
    { name: 'Student 1', email: 'student1@gmail.com', course: 'Class 10 Maths', paid: true },
    { name: 'Student 2', email: 'student2@gmail.com', course: 'Class 10 Science', paid: false },
    { name: 'Student 3', email: 'student3@gmail.com', course: 'Class 9 Maths', paid: true },
  ];

  // Courses list
  courses = [
    { title: 'Class 10 Maths', price: 199, students: 10 },
    { title: 'Class 10 Science', price: 199, students: 8 },
    { title: 'Class 9 Maths', price: 149, students: 5 },
  ];

  ngOnInit() {
    this.stats.totalStudents = this.students.length;
    this.stats.paidStudents = this.students.filter(s => s.paid).length;
    this.stats.totalRevenue = this.students
      .filter(s => s.paid)
      .length * 199;
  }
}
