import { LiveAnnouncer } from '@angular/cdk/a11y';
import { inject, Injectable, signal } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

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

  remainingSeconds: number = 60;
  minutes: number = 1;
  seconds: number = 0;
  private intervalId: any;
  isPaused: boolean = false;

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

  
pauseCountdown(): void {
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
    alert(this.currentImage == 3 ? '¡Has finalizado la ultima imagen! Da click en continuar para acceder a la segunda y ultima parte de este test.' : '¡Tiempo terminado! Da click en continuar para ver la siguiente imagen (Imagenes restantes: '+ (3 - this.currentImage) +')');
  }

  
  clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
