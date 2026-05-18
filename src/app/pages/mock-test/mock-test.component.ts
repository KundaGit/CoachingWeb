import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mock-test',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mock-test.component.html',
  styleUrl: './mock-test.component.css'
})
export class MockTestComponent implements OnInit, OnDestroy {

  currentQuestionIndex = 0;

  timer: any;

  // ⏱ 60 Minutes
  timeLeft = 60 * 60;
  warningOpen = false;

  questions: any[] = [];

  constructor(
    private router: Router
  ) {}

 ngOnInit() {

  this.generateQuestions();

  this.startTimer();

  this.enterFullscreen();

  // ✅ ANTI CHEAT

window.addEventListener(

  'blur',

  () => {

    // popup already open ho to stop

    if (this.warningOpen) return;

    this.warningOpen = true;

    setTimeout(() => {

      Swal.fire({

        title: '⚠ Warning',

        text:
          'You switched tabs/apps during exam!',

        icon: 'warning',

        showCancelButton: true,

        confirmButtonText:
          'Continue Exam',

        cancelButtonText:
          'Submit Test',

        allowOutsideClick: false,

        allowEscapeKey: false

      }).then((result) => {

        this.warningOpen = false;

        // ❌ submit only when cancel

        if (result.dismiss === Swal.DismissReason.cancel) {

          this.submitTest();
        }

      });

    }, 300);

  }
);
}

  ngOnDestroy() {

    clearInterval(this.timer);
  }

  // ✅ Generate 100 Questions

  generateQuestions() {

    for (let i = 1; i <= 100; i++) {

      this.questions.push({

        id: i,

        section:
          i <= 50
            ? 'Maths'
            : 'Reasoning',

        question:
          `Question ${i}: What is ${i} + ${i}?`,

        options: [

          `${i}`,

          `${i * 2}`,

          `${i + 1}`,

          `${i * 3}`

        ],

        answer: `${i * 2}`,

        selected: '',

        visited: false,

        markedForReview: false
      });
    }
  }

  // ✅ TIMER

  startTimer() {

    this.timer = setInterval(() => {

      this.timeLeft--;

      if (this.timeLeft <= 0) {

        this.submitTest();
      }

    }, 1000);
  }

  // ✅ Minutes

  get minutes() {

    return Math.floor(
      this.timeLeft / 60
    );
  }

  // ✅ Seconds

  get seconds() {

    return this.timeLeft % 60;
  }

  // ✅ Current Question

  get currentQuestion() {

    return this.questions[
      this.currentQuestionIndex
    ];
  }

  // ✅ Select Option

  selectOption(option: string) {

    this.currentQuestion.selected =
      option;

    this.currentQuestion.visited =
      true;

    this.autoSave();
  }

  // ✅ NEXT

  nextQuestion() {

    if (

      this.currentQuestionIndex <

      this.questions.length - 1

    ) {

      this.currentQuestionIndex++;
    }
  }

  // ✅ PREVIOUS

  prevQuestion() {

    if (

      this.currentQuestionIndex > 0

    ) {

      this.currentQuestionIndex--;
    }
  }

  // ✅ GO TO QUESTION

  goToQuestion(index: number) {

    this.currentQuestionIndex =
      index;
  }

  // ✅ MARK FOR REVIEW

  markForReview() {

    this.currentQuestion
      .markedForReview = true;
  }

  // ✅ AUTO SAVE

  autoSave() {

    localStorage.setItem(

      'mockAnswers',

      JSON.stringify(this.questions)
    );
  }

  // ✅ CALCULATE RESULT

  calculateResult() {

    let correct = 0;

    let wrong = 0;

    let unanswered = 0;

    this.questions.forEach(q => {

      if (!q.selected) {

        unanswered++;
      }

      else if (

        q.selected === q.answer

      ) {

        correct++;
      }

      else {

        wrong++;
      }

    });

    // ✅ NEGATIVE MARKING

    const score =

      (correct * 2)

      -

      (wrong * 0.5);

    // ✅ ACCURACY

    const accuracy =

      (

        (correct / this.questions.length)

        * 100

      ).toFixed(2);

    // ✅ RANK

    let rank = '📘 Beginner';

    if (score > 150) {

      rank = '🏆 Topper';
    }

    else if (score > 100) {

      rank = '🥈 Excellent';
    }

    else if (score > 50) {

      rank = '👍 Good';
    }

    return {

      score,

      correct,

      wrong,

      unanswered,

      accuracy,

      rank
    };
  }

  // ✅ SUBMIT TEST

  submitTest() {

    clearInterval(this.timer);

    const result =

      this.calculateResult();

    localStorage.setItem(

      'mockResult',

      JSON.stringify(result)
    );

    this.router.navigate([
      '/mock-result'
    ]);
  }

  // ✅ FULLSCREEN

  enterFullscreen() {

    const docElm: any =
      document.documentElement;

    if (docElm.requestFullscreen) {

      docElm.requestFullscreen();
    }
  }
}


