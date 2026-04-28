import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit {

  @Input() courseData: any;

  userEmail: string = '';
  isPaid: boolean = false;
  showDetail = false; // ✅ toggle ke liye

toggleDetail() {
  this.showDetail = !this.showDetail;
}

  get course() {
    return this.courseData;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.isPaid = localStorage.getItem(`isPaid_${this.courseData?.slug}`) === 'true';
  }
  
goToQuiz() {
  this.router.navigate(['/quiz', this.courseData.slug]);
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