import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  secretNumber = signal<number>(0);
  guess = signal<number | null>(null);
  message = signal<string>('');
  attempts = signal<number>(0);
  gameOver = signal<boolean>(false);

  constructor() {
    this.startGame();
  }

  startGame() {
    this.secretNumber.set(Math.floor(Math.random() * 100) + 1);
    this.guess.set(null);
    this.message.set('');
    this.attempts.set(0);
    this.gameOver.set(false);
  }

  checkGuess() {
    const guessValue = this.guess();
    
    if (!guessValue) {
      this.message.set('Введи число!');
      return;
    }

    this.attempts.update(a => a + 1);

    if (guessValue === this.secretNumber()) {
      this.message.set(`Правильно! 🎉 Ты угадал за ${this.attempts()} попыток!`);
      this.gameOver.set(true);
    } else if (guessValue < this.secretNumber()) {
      this.message.set('Число больше ⬆️');
    } else {
      this.message.set('Число меньше ⬇️');
    }
  }
}
