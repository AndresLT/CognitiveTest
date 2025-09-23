import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-image-test',
  imports: [MatFormFieldModule, MatChipsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './image-test.component.html',
  styleUrl: './image-test.component.scss'
})
export class ImageTestComponent implements OnInit, OnDestroy {

  sharedService = inject(SharedService)

  ngOnInit(): void {
    this.sharedService.keywords.set([])
    this.sharedService.startCountdown();
  }
  ngOnDestroy(): void {
    this.sharedService.clearTimer()
  }

  addToGroup1(event: MatChipInputEvent){
    this.sharedService.addToGroup1(event)
  }
  
  addToGroup2(event: MatChipInputEvent){
    this.sharedService.addToGroup2(event)
  }
  
  addToGroup3(event: MatChipInputEvent){
    this.sharedService.addToGroup3(event)
  }
}
