import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatIconModule} from '@angular/material/icon';
import { SharedService } from '../../services/shared.service';
import { ImageTestComponent } from '../image-test/image-test.component';
import { TextTestComponent } from '../text-test/text-test.component';
import { TestEndComponent } from '../test-end/test-end.component';
import { SupabaseService } from '../../services/supabase.service';
import { Response } from '../../shared/models/response';
import { User } from '../../shared/models/user';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-instructions',
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, FormsModule, ReactiveFormsModule, MatIconModule, ImageTestComponent, TextTestComponent, TestEndComponent],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.scss'
})
export class InstructionsComponent {
  page = 1;
  readonly keywords = signal<string[]>([]);
  readonly formControl = new FormControl(['']);
  input = ''
  
  next() {
    if(this.page == 5){
      
    }
    
    if(this.page == 4){
      alert('¡Recuerda que el contador de 5 minutos inciará al dar click en "Ok", dispondrás de este tiempo para leer los 2 enunciados y responder las preguntas!')
      this.page++;
    }
    if(this.page == 3 && this.sharedService.currentImage == 3){
      this.page++;
  
    }
    if(this.page < 3){
      this.page++;
    }else if (this.page == 3){
      this.sharedService.showSpinner()
      this.sharedService.resetCountdown()
      this.sharedService.keywords.set([])
      this.sharedService.currentImage++
      this.sharedService.imageLoaded = false;
    }
    if(this.page == 3 && this.sharedService.currentImage == 1){
      alert('¡Recuerda que el contador de 1 minuto inciará al dar click en "Ok"!')

    }
  }

  announcer = inject(LiveAnnouncer);
  sharedService = inject(SharedService);
  supabaseService = inject(SupabaseService);

  removeKeyword(keyword: string) {
    this.keywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
      return [...keywords];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    
    if (value) {
      this.keywords.update(keywords => [...keywords, value]);
    }
    
    if(this.keywords().length == 3) {
      this.announcer.announce(`You have added 3 keywords`);
      this.sharedService.testWordGroup.push(this.keywords());
      this.keywords.set([]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  async end(){
    this.sharedService.showSpinner()
    let user: User = JSON.parse(localStorage.getItem('user')!)
    let response: Response = new Response
    response.userId = user.id
    response.imageGroup1 = JSON.stringify(this.sharedService.wordGroup1)
    response.imageGroup2 = JSON.stringify(this.sharedService.wordGroup2)
    response.imageGroup3 = JSON.stringify(this.sharedService.wordGroup3)
    response.q1 = this.sharedService.answer1
    response.q1IsCorrect = this.sharedService.answer1 == 'C'
    response.q2 = this.sharedService.answer2
    response.q2IsCorrect = this.sharedService.answer2 == 'B'
    response.q3 = this.sharedService.answer3
    response.q3IsCorrect = this.sharedService.answer3 == 'D'
    response.q4 = this.sharedService.answer4
    response.q4IsCorrect = this.sharedService.answer4 == 'A'
    response.q5 = this.sharedService.answer5
    response.q5IsCorrect = this.sharedService.answer5 == 'B'
    const { data, error } = await this.supabaseService.createItem('Response', response);
    if(!error){
      user.testCompleted = true
      const { data, error } = await this.supabaseService.updateItem('Users', user.id, user);
      if(!error){
        this.page++
        this.sharedService.showToastSuccess('Respuestas enviadas correctamente', 'Te agradecemos tu participacion!')
        this.sharedService.cleanApp()

      }else{
        this.sharedService.showToastError('Ha ocurrido un error','Intenta nuevamente')

      }
    }else{
      this.sharedService.showToastError('Ha ocurrido un error','Intenta nuevamente')
    }
    this.sharedService.hideSpinner()
    
  }
}
