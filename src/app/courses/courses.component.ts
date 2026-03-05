import { Component } from '@angular/core';
import { CourseCardComponent } from "../shared/components/course-card/course-card.component";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

}
