import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LoggedInUser {
  email: string;
  name?: string;
  avatar?: string; // future use
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = 'http://localhost:5000/api/auth';

  private readonly LOGIN_KEY = 'loggedIn';
  private readonly USER_KEY = 'user';

  constructor(private http: HttpClient) {}

  // ================= EMAIL OTP APIs =================

  // SEND EMAIL OTP
  sendEmailOtp(email: string) {
    return this.http.post(`${this.API}/send-email-otp`, { email });
  }

  // VERIFY EMAIL OTP
  verifyEmailOtp(email: string, otp: string) {
    return this.http.post(`${this.API}/verify-email-otp`, { email, otp });
  }

  // ================= AUTH STATE =================

  // SAVE LOGIN + USER DATA
  loginSuccess(user: LoggedInUser): void {
    localStorage.setItem(this.LOGIN_KEY, 'true');
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem(this.LOGIN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // CHECK LOGIN
  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGIN_KEY) === 'true';
  }

  // GET LOGGED-IN USER
  getUser(): LoggedInUser | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // avtar upload API (future use)
  updateAvatar(avatar: string) {
  const user = this.getUser();
  if (!user) return;

  const updatedUser = { ...user, avatar };
  localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
}
}