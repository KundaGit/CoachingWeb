
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
//     {
//       title: 'Class 10 Maths',
      
//       description: 'Complete syllabus + tests',
//       price: 199,
//       teacher: 'PW Faculty',
//       duration: '12 Months',
//       slug: 'class-10-maths',
//    chapters: [
//   { 
//     name: 'Real Numbers',
//     free: true,
//     video: 'https://www.youtube.com/embed/watch?v=ERQq66b304U&list=RDERQq66b304U&start_radio=1',
//     pdf: 'assets/notes/real-numbers.pdf'
//   },

//   { 
//     name: 'Polynomials',
//     free: false,
//     video: 'https://www.youtube.com/embed/watch?v=EeCaXFKRPZ0&list=RDEeCaXFKRPZ0&start_radio=1',
//     pdf: 'assets/notes/polynomials.pdf'
//   },

//   { 
//     name: 'Linear Equations',
//     free: false,
//     video: 'https://www.youtube.com/embed/VIDEO_ID',
//     pdf: 'assets/notes/linear-equations.pdf'
//   },

//   { 
//     name: 'Quadratic Equations',
//     free: false,
//     video: 'https://www.youtube.com/embed/VIDEO_ID',
//     pdf: 'assets/notes/quadratic-equations.pdf'
//   }
// ]
//     }
   {
  title: 'Class 10 Maths',
  description: 'Complete syllabus + tests',
  price: 199,
  teacher: 'PW Faculty',
  duration: '12 Months',
  slug: 'class-10-maths',

  // 🔴 LIVE CLASS
  liveClass: {
    title: 'Algebra Marathon Live Class',
    teacher: 'PW Faculty',
    date: '12 May 2026',
    time: '7:00 PM',
    meetingLink: 'https://meet.google.com/'
  },

  chapters: [

    {
      name: 'Real Numbers',
      free: true,
      video: 'https://www.youtube.com/embed/watch?v=ERQq66b304U&list=RDERQq66b304U&start_radio=1',
      pdf: 'assets/notes/real-numbers.pdf'
    },

    {
      name: 'Polynomials',
      free: false,
      video: 'https://www.youtube.com/embed/watch?v=EeCaXFKRPZ0&list=RDEeCaXFKRPZ0&start_radio=1',
      pdf: 'assets/notes/polynomials.pdf'
    },

    {
      name: 'Linear Equations',
      free: false,
      video: 'https://www.youtube.com/embed/VIDEO_ID',
      pdf: 'assets/notes/linear-equations.pdf'
    },

    {
      name: 'Quadratic Equations',
      free: false,
      video: 'https://www.youtube.com/embed/VIDEO_ID',
      pdf: 'assets/notes/quadratic-equations.pdf'
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

  // 🔴 LIVE CLASS
  liveClass: {
    title: 'Science Revision Live Class',
    teacher: 'PW Science Faculty',
    date: '15 May 2026',
    time: '6:30 PM',
    meetingLink: 'https://meet.google.com/'
  },

  chapters: [

    {
      name: 'Light',
      free: true,
      video: 'https://www.youtube.com/embed/1muJQdq6VV8',
      pdf: 'assets/notes/light.pdf'
    },

    {
      name: 'Electricity',
      free: false,
      video: 'https://www.youtube.com/embed/ysz5S6PUM-U',
      pdf: 'assets/notes/electricity.pdf'
    },

    {
      name: 'Chemical Reactions',
      free: false,
      video: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
      pdf: 'assets/notes/chemical-reactions.pdf'
    },

    {
      name: 'Life Processes',
      free: false,
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      pdf: 'assets/notes/life-processes.pdf'
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

  // 🔴 LIVE CLASS
  liveClass: {
    title: 'Number Systems Live Session',
    teacher: 'PW Maths Faculty',
    date: '18 May 2026',
    time: '5:00 PM',
    meetingLink: 'https://meet.google.com/'
  },

  chapters: [

    {
      name: 'Number Systems',
      free: true,
      video: 'https://www.youtube.com/embed/ERQq66b304U',
      pdf: 'assets/notes/number-systems.pdf'
    },

    {
      name: 'Polynomials',
      free: false,
      video: 'https://www.youtube.com/embed/EeCaXFKRPZ0',
      pdf: 'assets/notes/class9-polynomials.pdf'
    },

    {
      name: 'Coordinate Geometry',
      free: false,
      video: 'https://www.youtube.com/embed/1muJQdq6VV8',
      pdf: 'assets/notes/coordinate-geometry.pdf'
    }

  ]
},
  ];
}