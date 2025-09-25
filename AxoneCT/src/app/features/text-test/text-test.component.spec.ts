import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTestComponent } from './text-test.component';

describe('TextTestComponent', () => {
  let component: TextTestComponent;
  let fixture: ComponentFixture<TextTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
