import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseCardComponent } from '../shared/components/course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { AiChatComponent } from "../ai-chat/ai-chat.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourseCardComponent, CommonModule, AiChatComponent,RouterModule],
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
  darkMode=false
  
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
toggleDarkMode() {

  this.darkMode = !this.darkMode;

  document.body.classList.toggle(
    'dark-theme',
    this.darkMode
  );

  // save
  localStorage.setItem(
    'darkMode',
    JSON.stringify(this.darkMode)
  );
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

  expandedSlug: string | null = null;

onCourseOpen(slug: string) {
  this.expandedSlug = slug;
}

 ngOnInit() {

  const savedTheme =
    localStorage.getItem('darkMode');

  if (savedTheme === 'true') {

    this.darkMode = true;

    document.body.classList.add('dark-theme');
  }

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