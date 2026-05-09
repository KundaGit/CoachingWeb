import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
interface Question {
  question: string;
  options: string[];
  correct: number;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
slug = '';
  currentIndex = 0;
  selectedAnswer: number | null = null;
  score = 0;
  quizDone = false;
answers: (number | null)[] = [];
quizData: { [key: string]: Question[] } = {
    'class-10-maths': [
      {
        question: 'What is the HCF of 12 and 18?',
        options: ['2', '4', '6', '9'],
        correct: 2
      },
      {
        question: 'What is the value of π (pi)?',
        options: ['3.14', '2.17', '1.41', '3.41'],
        correct: 0
      },
      {
        question: 'Solve: 2x + 3 = 7, x = ?',
        options: ['1', '2', '3', '4'],
        correct: 1
      },
      {
        question: 'Area of circle with radius 7 = ?',
        options: ['154', '144', '164', '174'],
        correct: 0
      },
      {
        question: 'What is the sum of angles in a triangle?',
        options: ['90°', '180°', '270°', '360°'],
        correct: 1
      }
    ],
    'class-10-science': [
      {
        question: 'Chemical formula of water?',
        options: ['H2O', 'CO2', 'O2', 'H2SO4'],
        correct: 0
      },
      {
        question: 'Which gas do plants absorb?',
        options: ['Oxygen', 'Nitrogen', 'CO2', 'Hydrogen'],
        correct: 2
      },
      {
        question: 'Unit of electric current?',
        options: ['Volt', 'Watt', 'Ampere', 'Ohm'],
        correct: 2
      },
      {
        question: 'Speed of light?',
        options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10⁴ m/s', '3×10² m/s'],
        correct: 0
      },
      {
        question: 'Which organ pumps blood?',
        options: ['Lungs', 'Liver', 'Brain', 'Heart'],
        correct: 3
      }
    ],
    'class-9-maths': [
      {
        question: 'What is √144?',
        options: ['11', '12', '13', '14'],
        correct: 1
      },
      {
        question: 'Value of (a+b)² = ?',
        options: ['a²+b²', 'a²+2ab+b²', 'a²-2ab+b²', '2a+2b'],
        correct: 1
      },
      {
        question: 'How many sides does a hexagon have?',
        options: ['5', '6', '7', '8'],
        correct: 1
      },
      {
        question: 'What is 15% of 200?',
        options: ['25', '30', '35', '40'],
        correct: 1
      },
      {
        question: 'Perimeter of square with side 5cm?',
        options: ['15cm', '20cm', '25cm', '30cm'],
        correct: 1
      }
    ]
  };


  get questions(): Question[] {
    return this.quizData[this.slug] || [];
  }

  get currentQuestion(): Question {
    return this.questions[this.currentIndex];
  }

  get totalQuestions(): number {
    return this.questions.length;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Image code for certificate
  loadImage(url: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      resolve(canvas.toDataURL('image/png'));
    };
  });
}

async downloadCertificate() {

  const doc = new jsPDF('landscape');

  const name = localStorage.getItem('userEmail') || 'Student';
  const course = this.slug.replace(/-/g, ' ').toUpperCase();
  const date = new Date().toLocaleDateString();

  // 🖼 LOAD IMAGES
  const logo = await this.loadImage('assets/Kundanlogo.png');
  const seal = await this.loadImage('assets/seal.jpg');

  // 🎨 BORDER
  doc.setDrawColor(99, 102, 241);
  doc.setLineWidth(4);
  doc.rect(10, 10, 277, 190);

  doc.setDrawColor(200);
  doc.setLineWidth(1);
  doc.rect(15, 15, 267, 180);

  // 🏫 LOGO (TOP LEFT)
  doc.addImage(logo, 'PNG', 20, 20, 30, 30);

  // 🏅 GOLD SEAL (RIGHT)
doc.addImage(seal, 'jpg', 210, 110, 35, 35);

  // 🎓 TITLE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(79, 70, 229);
  doc.text('CERTIFICATE', 148, 40, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text('OF COMPLETION', 148, 55, { align: 'center' });

  // 📜 TEXT
  doc.setFontSize(14);
  doc.text('This certificate is proudly awarded to', 148, 80, { align: 'center' });

  // 👤 NAME
  doc.setFontSize(24);
  doc.setTextColor(16, 185, 129);
  doc.text(name, 148, 100, { align: 'center' });

  // 📚 COURSE
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('for successfully completing the course', 148, 115, { align: 'center' });

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(course, 148, 130, { align: 'center' });

  // 🎯 SCORE
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Score: ${this.score}/${this.totalQuestions}`, 148, 145, { align: 'center' });

  // 📅 DATE
  doc.setFontSize(12);
  doc.text(`Date: ${date}`, 40, 180);

  // ✍️ SIGNATURE
  doc.line(200, 170, 260, 170);
  doc.text('Authorized Signature', 230, 180, { align: 'center' });

  // 🏆 FOOTER
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text('Kundan Institute • Empowering Students', 148, 190, { align: 'center' });

  doc.save('certificate.pdf');
}

 ngOnInit() {
  this.route.params.subscribe(params => {
    this.slug = params['slug'];

    if (!this.slug || !this.quizData[this.slug]) {
      console.error('❌ Invalid slug', this.slug);
      return;
    }

    this.answers = new Array(this.quizData[this.slug].length).fill(null);
  });
}
  selectAnswer(index: number) {
    if (this.selectedAnswer !== null) return; // already answered
    this.selectedAnswer = index;
    this.answers[this.currentIndex] = index;
  }

  next() {
    if (this.currentIndex < this.totalQuestions - 1) {
      this.currentIndex++;
      this.selectedAnswer = this.answers[this.currentIndex];
    } else {
      this.submitQuiz();
    }
  }

  submitQuiz() {
    this.score = this.questions.reduce((acc, q, i) => {
      return acc + (this.answers[i] === q.correct ? 1 : 0);
    }, 0);
    this.quizDone = true;
  }

  getResult(): string {
    const percent = (this.score / this.totalQuestions) * 100;
    if (percent === 100) return '🏆 Perfect Score!';
    if (percent >= 80) return '🌟 Excellent!';
    if (percent >= 60) return '👍 Good Job!';
    if (percent >= 40) return '📚 Keep Practicing!';
    return '💪 Try Again!';
  }

  retryQuiz() {
    this.currentIndex = 0;
    this.selectedAnswer = null;
    this.score = 0;
    this.quizDone = false;
    this.answers = new Array(this.totalQuestions).fill(null);
  }

  goBack() {
    this.router.navigate(['/courses']);
  }
}
