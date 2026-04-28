import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
  path: 'admin', 
  component: AdminComponent, 
  canActivate: [authGuard] 
},
  {
    path: '',
    component: LayoutComponent,
    // ❌ canActivate hatao yahan se
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'courses', component: CoursesComponent },
      // ✅ sirf profile protected
      { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
      { path: 'quiz/:slug', component: QuizComponent, canActivate: [authGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];