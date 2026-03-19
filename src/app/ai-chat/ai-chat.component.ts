import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent {
 messages: any[] = [];
  userInput: string = '';
  loading: boolean = false;
  isOpen = false;

  constructor(private http: HttpClient) {}

  toggleChat() {
  this.isOpen = !this.isOpen;
}
  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg = this.userInput;

    // User message add
    this.messages.push({ role: 'user', text: userMsg });
    
    this.userInput = '';
    this.loading = true;

    this.http.post<any>('http://localhost:5000/api/ai/chat', {
      message: userMsg
    }).subscribe({
      next: (res) => {
        this.messages.push({ role: 'ai', text: res.reply });
        this.loading = false;
      },
      error: () => {
        this.messages.push({ role: 'ai', text: '❌ Error aaya bhai' });
        this.loading = false;
      }
    });
  }

}
