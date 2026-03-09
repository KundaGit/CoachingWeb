import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {

  constructor(private http: HttpClient, private route:ActivatedRoute,private router: Router) {
     this.courseSlug = this.route.snapshot.params['slug'];
  }

  userEmail! : string  ;
   courseSlug = '';
  isPaid = false; // This should ideally come from a service that checks the user's payment status

  course = {
    title: 'Class 10 Maths',
    description: 'Complete syllabus + tests',
    price: 199,
    teacher: 'PW Faculty',
    duration: '12 Months',
    chapters: [
      { name: 'Real Numbers', free: true },
      { name: 'Polynomials', free: false },
      { name: 'Linear Equations', free: false },
      { name: 'Quadratic Equations', free: false },
      { name: 'Statistics', free: false }
    ]
  };

  ngOnInit() {

    this.userEmail = localStorage.getItem('userEmail') || '';
    this.isPaid=localStorage.getItem('isPaid') === 'true';
  }
payNow() {
  this.http.post<any>('http://localhost:5000/api/payment/create-order', {
    amount: 499,
    email: this.userEmail
  }).subscribe(res => {

    const options = {
      key: res.key,
      amount: 499 * 100,
      currency: 'INR',
      name: 'Kundan Institute App',
      description: 'Course Access',
      order_id: res.orderId,
      handler: (response: any) => {
        this.verifyPayment(response);
      },
      theme: { color: '#0bd7d7' }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  });
}
verifyPayment(response: any) {

  this.http.post('http://localhost:5000/api/payment/verify', response)
  .subscribe(() => {

    localStorage.setItem('isPaid', 'true');
    localStorage.setItem('paymentId', response.razorpay_payment_id);

    this.isPaid = true;

    Swal.fire({
      icon: 'success',
      title: 'Payment Successful',
      html: `
        <div style="font-size:13px;color:#666">
          ${this.userEmail}<br/>
          Course Activated
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

  });

}
isPaidUser(): boolean {
  return localStorage.getItem('isPaid') === 'true';
}
// pdf download function
downloadInvoice() {

  const paymentId = localStorage.getItem("paymentId");

  window.open(
    `http://localhost:5000/api/payment/invoice/${paymentId}`,
    "_blank"
  );

}


}
