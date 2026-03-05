import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // =====================
  // VIEW / EDIT MODE
  // =====================
  editMode = false;

  // =====================
  // USER DATA (DYNAMIC)
  // =====================
  user = {
    name: '',
    mobile: '',
    email: '',
    city: '',
    class: '',
    board: '',
    exam: 'Railway',
    language: '',
    state: ''
  };

  // =====================
  // AVATAR
  // =====================
  avatar: string | null = null;
  userInitial = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  // =====================
  // INIT
  // =====================
  ngOnInit(): void {
    const loggedUser = this.auth.getUser();

    if (!loggedUser) {
      this.router.navigate(['/login']);
      return;
    }

    // 🔥 EMAIL 100% DYNAMIC (LOGIN SE)
    this.user.email = loggedUser.email;
    this.userInitial = loggedUser.email.charAt(0).toUpperCase();

    // Avatar (agar pehle upload kiya ho)
    this.avatar = loggedUser.avatar || null;

    // Extra profile data (agar saved ho)
    const savedProfile = localStorage.getItem('profileData');
    if (savedProfile) {
      const data = JSON.parse(savedProfile);
      this.user = { ...this.user, ...data };
    }
  }

  // =====================
  // EDIT MODE
  // =====================
  enableEdit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.ngOnInit();
  }

  // =====================
  // SAVE PROFILE
  // =====================
  saveProfile() {
    // Email kabhi overwrite nahi hoga
    const { email, ...rest } = this.user;
    localStorage.setItem('profileData', JSON.stringify(rest));
    this.editMode = false;
  }

  // =====================
  // AVATAR CHANGE
  // =====================
  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.avatar = reader.result as string;

      // 🔥 SAME AS TERA PURANA LOGIC
      this.auth.updateAvatar(this.avatar);
    };

    reader.readAsDataURL(file);
  }

  // =====================
  // LOGOUT (PW STYLE)
  // =====================
  logout() {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      width: 300,
      customClass: { popup: 'mini-swal' }
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          html: `<div class="swal-sub">See you again 👋</div>`,
          width: 300,
          showConfirmButton: false,
          timer: 1200,
          customClass: { popup: 'mini-swal' }
        }).then(() => {

          localStorage.removeItem('profileData');
          localStorage.removeItem('avatar');
          this.auth.logout();
          this.router.navigate(['/login']);
        });

      }
    });
  }
}

