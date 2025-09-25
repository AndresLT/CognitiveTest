import { LiveAnnouncer } from '@angular/cdk/a11y';
import { inject, Injectable, signal } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  user: User = new User

  testStarted = false

  currentImage = 1

  userEmail = new FormControl('', [Validators.required, Validators.email])
  userValidated = false
  page = 1

  testWordGroup = [['Maestra', 'Estudiantes', 'Clase'], ['Pizarra', 'Tiza', 'Ecuacion']]
  
  readonly keywords = signal<string[]>([]);
  readonly formControl = new FormControl(['']);
  wordGroup1: string[][] = []
  wordGroup2: string[][] = []
  wordGroup3: string[][] = []

  announcer = inject(LiveAnnouncer);

  //Images timer
  remainingSeconds: number = 60;
  minutes: number = 1;
  seconds: number = 0;
  private intervalId: any;
  isPaused: boolean = false;

  //Text timer
  remainingSecondsText: number = 300;
  minutesText: number = 5;
  secondsText: number = 0;
  private intervalIdText: any;
  isPausedText: boolean = false;

  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';
  answer5: string = '';

  constructor(private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  showSpinner(){
    this.spinner.show()
  }

  hideSpinner(){
    this.spinner.hide()
  }

  showToastSuccess(title: string, text: string){
    this.toastr.success(text, title)
  }
  showToastInfo(title: string, text: string){
    this.toastr.info(text, title)
  }
  showToastWarning(title: string, text: string){
    this.toastr.warning(text, title)
  }
  showToastError(title: string, text: string){
    this.toastr.error(text, title)
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user') || '')
  }

  logout(){
    this.page = 1
    localStorage.removeItem('user')
    this.userEmail.enable()
    this.userValidated = false
    this.userEmail.setValue('')
  }

  cleanApp(){
    localStorage.removeItem('user')
    this.userEmail.enable()
    this.userValidated = false
    this.userEmail.setValue('')
    this.currentImage = 1
    this.wordGroup1 = []
    this.wordGroup2 = []
    this.wordGroup3 = []
    this.answer1 = ''
    this.answer2 = ''
    this.answer3 = ''
    this.answer4 = ''
    this.answer5 = ''
  }

  addToGroup1(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value ) {
      this.keywords.update(keywords => [...keywords, value]);
    }
    
    if(this.keywords().length == 3) {
      this.announcer.announce(`You have added 3 keywords`);
      this.wordGroup1.push(this.keywords());
      this.keywords.set([]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  addToGroup2(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.update(keywords => [...keywords, value]);
    }
    
    if(this.keywords().length == 3) {
      this.announcer.announce(`You have added 3 keywords`);
      this.wordGroup2.push(this.keywords());
      this.keywords.set([]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  addToGroup3(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.update(keywords => [...keywords, value]);
    }
    
    if(this.keywords().length == 3) {
      this.announcer.announce(`You have added 3 keywords`);
      this.wordGroup3.push(this.keywords());
      this.keywords.set([]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

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
  
  startCountdownText(): void {
    this.clearTimerText();

    this.intervalIdText = setInterval(() => {
      if (!this.isPausedText && this.remainingSecondsText > 0) {
        this.remainingSecondsText--;
        this.minutesText = Math.floor(this.remainingSecondsText / 60);
        this.secondsText = this.remainingSecondsText % 60;
      } else if (this.remainingSecondsText === 0) {
        this.clearTimerText();
        this.onCountdownFinishedText();
      }
    }, 1000);
  }

  
  pauseCountdown(): void {
    this.isPaused = true;
  }
  pauseCountdownText(): void {
    this.isPausedText = true;
  }

  resumeCountdown(): void {
    if (this.isPaused) {
      this.isPaused = false;
    }
  }
  resumeCountdownText(): void {
    if (this.isPausedText) {
      this.isPausedText = false;
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
  resetCountdownText(): void {
    this.clearTimerText();
    this.remainingSecondsText = 300;
    this.minutesText = 5;
    this.secondsText = 0;
    this.isPausedText = false;
    this.startCountdownText();
  }

  onCountdownFinished(): void {
    console.log('⏰ ¡Tiempo terminado!');
    // Aquí puedes disparar cualquier acción adicional
    alert(this.currentImage == 3 ? '¡Has finalizado la ultima imagen! Da click en continuar para acceder a la segunda y ultima parte de este test.' : '¡Tiempo terminado! Da click en continuar para ver la siguiente imagen (Imagenes restantes: '+ (3 - this.currentImage) +')');
  }
  onCountdownFinishedText(): void {
    console.log('⏰ ¡Tiempo terminado!');
    // Aquí puedes disparar cualquier acción adicional
    alert('¡Han finalizado los 5 minutos! Da click en continuar para guardar tus respuestas y finalizar con la prueba.');
  }

  
  clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  clearTimerText(): void {
    if (this.intervalIdText) {
      clearInterval(this.intervalIdText);
    }
  }
}
