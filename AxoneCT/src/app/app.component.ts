import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from "ngx-spinner";
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'AxoneCT';

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (localStorage.getItem('user')) {
      $event.preventDefault();
      $event.returnValue = 'Si actualizas o cierras esta pagina los cambios no seran guardados. ¿Estás seguro de que deseas salir?';
    }
  }

  constructor(public sharedService: SharedService){

  }
  
  async ngOnInit(): Promise<void> {
  }

}
