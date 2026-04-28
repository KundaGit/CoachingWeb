import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  ngOnInit() {
    this.slug = this.route.snapshot.params['slug'];
    this.answers = new Array(this.totalQuestions).fill(null);
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
