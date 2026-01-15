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
      this.message.set('Please enter a number!');
      return;
    }

    this.attempts.update(a => a + 1);

    if (guessValue === this.secretNumber()) {
      this.message.set(`Correct! 🎉 You guessed it in ${this.attempts()} ${this.attempts() === 1 ? 'attempt' : 'attempts'}!`);
      this.gameOver.set(true);
    } else if (guessValue < this.secretNumber()) {
      this.message.set('The number is higher ⬆️');
    } else {
      this.message.set('The number is lower ⬇️');
    }
  }
}
