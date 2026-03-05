import { routes } from './../../../app.routes';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {

  constructor(private http: HttpClient, private route:ActivatedRoute){
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
      name: 'Institute App',
      description: 'Course Access',
      order_id: res.orderId,
      handler: (response: any) => {
        this.verifyPayment(response);
      },
      theme: { color: '#0b5ed7' }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  });
}
verifyPayment(response: any) {
  this.http.post('http://localhost:5000/api/payment/verify', response)
    .subscribe(() => {
      localStorage.setItem('isPaid', 'true');
      alert('Payment Successful 🎉');
    });
}
isPaidUser(): boolean {
  return localStorage.getItem('isPaid') === 'true';
}


}
