import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-text-test',
  imports: [MatRadioModule, FormsModule],
  templateUrl: './text-test.component.html',
  styleUrl: './text-test.component.scss'
})
export class TextTestComponent implements OnInit, OnDestroy {
  sharedService = inject(SharedService);

  ngOnInit(): void {
    this.sharedService.startCountdownText();
  }
  ngOnDestroy(): void {
    this.sharedService.clearTimerText()
  }
}
