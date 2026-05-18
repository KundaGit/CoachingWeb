import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mock-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mock-result.component.html',
  styleUrl: './mock-result.component.css'
})
export class MockResultComponent {
result = JSON.parse(
    localStorage.getItem('mockResult') || '{}'
  );
}
