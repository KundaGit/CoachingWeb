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
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { RefundPolicyComponent } from './pages/refund-policy/refund-policy.component';
import { MockTestComponent } from './pages/mock-test/mock-test.component';
import { MockResultComponent } from './pages/mock-result/mock-result.component';

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
  {
    path: 'mock-test',component: MockTestComponent
  },
  {
    path: 'mock-result', component: MockResultComponent
  },

  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'refund-policy', component: RefundPolicyComponent },

  { path: 'courses', component: CoursesComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'quiz/:slug', component: QuizComponent, canActivate: [authGuard] },
  {
  path: 'dashboard',
  loadComponent: () => import('./pages/dashboard/dashboard.component')
    .then(m => m.DashboardComponent)
},

  { path: '', redirectTo: 'home', pathMatch: 'full' }
]
  }
];