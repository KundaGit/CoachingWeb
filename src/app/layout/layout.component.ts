import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule,RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  userEmail: string = '';
 userInitial: string = '';
  userAvatar: string | null = null; // future use
  
  isDropdownOpen: boolean = false;
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
   if (user?.email) {
      this.userEmail = user.email;
      this.userInitial = user.email.charAt(0).toUpperCase();
      this.userAvatar = user.avatar || null; // future use
    }
  }
  notifications = [
  { id: 1, text: 'New course added: Class 10 Maths', read: false },
  { id: 2, text: 'Your profile was updated', read: false },
  { id: 3, text: 'Welcome to Institute App 🎉', read: true }
];

// UNREAD COUNT
get unreadCount() {
  return this.notifications.filter(n => !n.read).length;
}

// TOGGLE DROPDOWN
toggleNotifications() {
  this.isNotifOpen = !this.isNotifOpen;
}

// MARK ALL READ
markAllRead() {
  this.notifications = this.notifications.map(n => ({
    ...n,
    read: true
  }));
}

isNotifOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  goToProfile() {
    this.router.navigate(['/profile']);
    this.isDropdownOpen = false;
  }

 logout() {
  Swal.fire({
    title: 'Logout?',
    text: 'Are you sure you want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Logout',
    cancelButtonText: 'Cancel',
    width: 300,
    customClass: {
      popup: 'mini-swal'
    }
  }).then((result) => {
    if (result.isConfirmed) {

      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        html: `<div class="swal-sub">See you again 👋</div>`,
        width: 300,
        showConfirmButton: false,
        timer: 1200,
        customClass: {
          popup: 'mini-swal'
        }
      }).then(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      });

    }
  });
}
   // 🔥 CLICK OUTSIDE → CLOSE DROPDOWN
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.isDropdownOpen = false;
    }
  }
}