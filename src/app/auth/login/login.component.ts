import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import {
  Component,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnDestroy {

  email = '';
  maskedEmail = '';
  otp = '';
otpArray = new Array(6);
  step: 'email' | 'otp' = 'email';

  timer = 30;
  canResend = false;
  intervalId: any;
@ViewChild('otpInput') otpInput!: ElementRef;
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  focusInput() {
  this.otpInput.nativeElement.focus();
}
onOtpChange() {

  this.otp = this.otp.replace(/\D/g, '');

  if (this.otp.length > 6) {
    this.otp = this.otp.slice(0, 6);
  }

}

  /* SEND OTP */
  sendOtp() {
    if (!this.email || !this.email.includes('@')) {
      alert('Enter valid email');
      return;
    }

    this.auth.sendEmailOtp(this.email).subscribe({
      next: () => {
        this.step = 'otp';
        this.maskedEmail = this.maskEmail(this.email);
        this.startTimer();
      },
      
      error: () => alert('OTP send failed')
    });
  }

  /* MASK EMAIL */
  maskEmail(email: string): string {
    const [name, domain] = email.split('@');
    if (name.length <= 2) return email;
    return name.substring(0, 2) + '****@' + domain;
  }

  /* VERIFY OTP */
  verifyOtp() {

    if (this.otp.length !== 6) {
      alert('Enter 6 digit OTP');
      return;
    }

    this.auth.verifyEmailOtp(this.email, this.otp).subscribe({
      next: () => {

        this.auth.loginSuccess({ email: this.email });

      Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          html: `
            <div style="font-size:13px;color:#666">
              ${this.email}<br/>
              Redirecting...
            </div>
          `,
          width: 320,
          padding: '1.2rem',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          backdrop: 'rgba(0,0,0,0.4)'
        }).then(() => {
          this.router.navigate(['/home']);
        });
      },
      error: () => alert('Invalid OTP')
    });
  }

  

   

  /* TIMER */
  startTimer() {

    this.timer = 30;
    this.canResend = false;

    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {

      this.timer--;

      if (this.timer === 0) {
        clearInterval(this.intervalId);
        this.canResend = true;
      }

    }, 1000);

  }

  resendOtp() {

    if (!this.canResend) return;

    this.auth.sendEmailOtp(this.email).subscribe({
      next: () => {
        this.otp = '';
        this.startTimer();
      },
      error: () => alert('Resend OTP failed')
    });

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}