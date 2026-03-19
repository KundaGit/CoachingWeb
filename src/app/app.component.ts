import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AiChatComponent } from "./ai-chat/ai-chat.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AiChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'institute-app';
}
