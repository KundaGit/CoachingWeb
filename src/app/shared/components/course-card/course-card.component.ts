import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit {

  @Input() courseData: any;
    @Input() isExpanded: boolean = false;
@Output() opened = new EventEmitter<void>();

  userEmail: string = '';
  isPaid: boolean = false;
  currentVideo!: SafeResourceUrl;
  selectedChapter: any;
  showDetail = false; // ✅ toggle ke liye
  


toggleDetail() {
   this.opened.emit();
  this.showDetail = !this.showDetail;

  if (this.showDetail && this.courseData?.chapters?.length) {
    this.selectedChapter = this.courseData.chapters[0];

    const videoUrl = this.courseData.chapters[0].video;
    if (videoUrl) {  // ← sirf tab set karo jab video ho
      this.currentVideo = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
  }
}
ngOnChanges() {
  if (!this.isExpanded) {
    this.showDetail = false;
  }
}

selectVideo(ch: any) {
  if (ch.free || this.isPaid) {
    this.selectedChapter = ch;

    this.currentVideo = this.sanitizer.bypassSecurityTrustResourceUrl(ch.video);
  // 👇 AUTO SCROLL TO VIDEO
    setTimeout(() => {
      const el = document.getElementById('videoPlayer');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    // ✅ SAVE LAST VIDEO
    localStorage.setItem(
      `lastVideo_${this.courseData.slug}`,
      JSON.stringify(ch)
    );
  }
   console.log("VIDEO SWITCH 👉", ch.video); // 👈 debug
}
  get course() {
    return this.courseData;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.isPaid = localStorage.getItem(`isPaid_${this.courseData?.slug}`) === 'true';
    console.log('Course Data 👉', this.courseData); // 👈 yaha daal
  }
  

  player: any;

ngAfterViewInit() {
  (window as any).onYouTubeIframeAPIReady = () => {
    this.player = new (window as any).YT.Player('player', {
      events: {
        onStateChange: (event: any) => {
          if (event.data === 0) {
            this.playNextVideo(); // 🎯 video end
          }
        }
      }
    });
  };
}

playNextVideo() {
  const index = this.courseData.chapters.findIndex(
    (c: any) => c === this.selectedChapter
  );

  const next = this.courseData.chapters[index + 1];

  if (next && (next.free || this.isPaid)) {
    this.selectVideo(next);
  }
}

saveProgress(ch: any) {
  const key = `progress_${this.courseData.slug}`;
  let progress = JSON.parse(localStorage.getItem(key) || '[]');

  if (!progress.includes(ch.name)) {
    progress.push(ch.name);
  }

  localStorage.setItem(key, JSON.stringify(progress));
}
// goToQuiz() {
//   this.router.navigate(['/quiz', this.courseData.slug]);
// }

goToQuiz() {
  console.log('👉 courseData:', this.courseData);

  const slug = this.courseData?.slug;

  if (!slug) {
    alert('❌ Slug missing — check console');
    return;
  }

  this.router.navigate(['/quiz', slug]);
}

  // ─── PAY NOW ───
  payNow() {

    // ✅ Login check pehle
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/courses' }
      });
      return;
    }

    this.http.post<any>(
      'http://localhost:5000/api/payment/create-order',
      {
        amount: this.courseData.price,
        email: this.userEmail
      }
    ).subscribe({
      next: (res) => {
        const options = {
          key: res.key,
          amount: this.courseData.price * 100,
          currency: 'INR',
          name: 'Kundan Institute App',
          description: this.courseData.title,
          order_id: res.orderId,
          handler: (response: any) => {
            this.verifyPayment(response);
          },
          theme: { color: '#0bd7d7' }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Could not create order. Please try again.',
          width: 320,
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  }

  // ─── VERIFY PAYMENT ───
  verifyPayment(response: any) {

    this.http.post(
      'http://localhost:5000/api/payment/verify',
      response
    ).subscribe({
      next: () => {

        // ✅ Per-course isPaid store karo
        localStorage.setItem(`isPaid_${this.courseData.slug}`, 'true');
        localStorage.setItem('paymentId', response.razorpay_payment_id);
        this.isPaid = true;

        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          html: `
            <div style="font-size:13px;color:#666">
              ${this.userEmail}<br/>
              Course Activated: <b>${this.courseData.title}</b>
            </div>
          `,
          width: 320,
          padding: '1.2rem',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          backdrop: 'rgba(0,0,0,0.4)'
        }).then(() => {
          this.router.navigate(['/home']);
        });

      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: 'Payment could not be verified. Contact support.',
          width: 320,
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  }

  // ─── IS PAID USER ───
  isPaidUser(): boolean {
    return localStorage.getItem(`isPaid_${this.courseData?.slug}`) === 'true';
  }

  // ─── DOWNLOAD INVOICE ───
  downloadInvoice() {
    const paymentId = localStorage.getItem('paymentId');
    window.open(
      `http://localhost:5000/api/payment/invoice/${paymentId}`,
      '_blank'
    );
  }

}