import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import {
  Component,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef
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

  step: 'email' | 'otp' = 'email';

  otpBoxes: string[] = ['', '', '', '', '', ''];

  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  timer = 30;
  canResend = false;
  intervalId: any;

  isOtpComplete = false;
  otpError = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  /* ================= SEND OTP ================= */
  sendOtp() {
    if (!this.email || !this.email.includes('@')) {
      alert('Enter valid email');
      return;
    }

    this.auth.sendEmailOtp(this.email).subscribe({
      next: () => {
        this.step = 'otp';
        this.otpBoxes = ['', '', '', '', '', ''];
        this.isOtpComplete = false;
        this.maskedEmail = this.maskEmail(this.email);
        this.startTimer();

        setTimeout(() => {
          this.otpInputs.first?.nativeElement.focus();
        });
      },
      error: () => alert('OTP send failed')
    });
  }

  /* ================= MASK EMAIL ================= */
  maskEmail(email: string): string {
    const [name, domain] = email.split('@');
    if (name.length <= 2) return email;
    return name.substring(0, 2) + '****@' + domain;
  }

  /* ================= OTP INPUT ================= */
  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    // empty
    if (!value) {
      input.value = '';
      this.otpBoxes[index] = '';
      this.updateOtpState();
      return;
    }

    // only one digit
    input.value = value.charAt(0);
    this.otpBoxes[index] = value.charAt(0);

    // move to next box
    if (index < this.otpBoxes.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    this.updateOtpState();
  }

  /* ================= BACKSPACE ================= */
 onOtpBackspace(index: number) {
  // agar current box empty hai → previous pe jao
  if (!this.otpBoxes[index] && index > 0) {
    this.otpInputs.toArray()[index - 1].nativeElement.focus();
  }

  this.updateOtpState();
}

  /* ================= PASTE OTP ================= */
  onOtpPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pasted = event.clipboardData?.getData('text') || '';
    const digits = pasted.replace(/\D/g, '').slice(0, 6);

    if (digits.length !== 6) return;

    this.otpBoxes = digits.split('');

    this.otpInputs.forEach((ref, i) => {
      ref.nativeElement.value = this.otpBoxes[i];
    });

    this.updateOtpState();
    this.otpInputs.last?.nativeElement.focus();
  }

  /* ================= OTP STATE ================= */
  updateOtpState() {
    this.isOtpComplete = this.otpBoxes.every(d => d !== '');
    if (this.otpError) this.otpError = false;
  }

  /* ================= VERIFY OTP ================= */
  verifyOtp() {
    const otp = this.otpBoxes.join('');
    if (otp.length !== 6) return;

    this.auth.verifyEmailOtp(this.email, otp).subscribe({
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
          timer: 2000,
          timerProgressBar: true,
          backdrop: 'rgba(0,0,0,0.4)'
        }).then(() => {
          this.router.navigate(['/home']);
        });
      },
      error: () => this.triggerOtpError()
    });
  }

  /* ================= OTP ERROR ================= */
  triggerOtpError() {
    this.otpError = true;
    this.isOtpComplete = false;
    this.otpBoxes = ['', '', '', '', '', ''];

    this.otpInputs.forEach(ref => ref.nativeElement.value = '');

    setTimeout(() => {
      this.otpError = false;
      this.otpInputs.first?.nativeElement.focus();
    }, 400);
  }

  /* ================= TIMER ================= */
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
        this.otpBoxes = ['', '', '', '', '', ''];
        this.isOtpComplete = false;
        this.startTimer();

        this.otpInputs.forEach(ref => ref.nativeElement.value = '');
        this.otpInputs.first?.nativeElement.focus();
      },
      error: () => alert('Resend OTP failed')
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}