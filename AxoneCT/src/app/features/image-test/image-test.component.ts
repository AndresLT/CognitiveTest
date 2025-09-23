import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-test',
  imports: [],
  templateUrl: './image-test.component.html',
  styleUrl: './image-test.component.scss'
})
export class ImageTestComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.startCountdown();
  }
  ngOnDestroy(): void {
    this.clearTimer()
  }

  minutes: number = 1;
  seconds: number = 0;
  private intervalId: any;
  private remainingSeconds: number = 60;
  isPaused: boolean = false;

  startCountdown(): void {
    this.clearTimer();

    this.intervalId = setInterval(() => {
      if (!this.isPaused && this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.minutes = Math.floor(this.remainingSeconds / 60);
        this.seconds = this.remainingSeconds % 60;
      } else if (this.remainingSeconds === 0) {
        this.clearTimer();
        this.onCountdownFinished();
      }
    }, 1000);
  }

  
auseCountdown(): void {
    this.isPaused = true;
  }

  resumeCountdown(): void {
    if (this.isPaused) {
      this.isPaused = false;
    }
  }

  resetCountdown(): void {
    this.clearTimer();
    this.remainingSeconds = 60;
    this.minutes = 1;
    this.seconds = 0;
    this.isPaused = false;
    this.startCountdown();
  }

  onCountdownFinished(): void {
    console.log('⏰ ¡Tiempo terminado!');
    // Aquí puedes disparar cualquier acción adicional
    alert('¡Tiempo terminado!');
  }

  
  clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


}
