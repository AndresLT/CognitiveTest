import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatIconModule} from '@angular/material/icon';
import { SharedService } from '../../services/shared.service';
import { ImageTestComponent } from '../image-test/image-test.component';

@Component({
  selector: 'app-instructions',
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, FormsModule, ReactiveFormsModule, MatIconModule, ImageTestComponent],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.scss'
})
export class InstructionsComponent {
  page = 1;
  readonly keywords = signal<string[]>([]);
  readonly formControl = new FormControl(['']);
  
  next() {
    this.page++;
  }

  announcer = inject(LiveAnnouncer);
  sharedService = inject(SharedService);

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
    console.log(this.keywords().length);
    
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
}
