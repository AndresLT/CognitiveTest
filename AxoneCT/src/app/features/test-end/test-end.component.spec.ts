import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEndComponent } from './test-end.component';

describe('TestEndComponent', () => {
  let component: TestEndComponent;
  let fixture: ComponentFixture<TestEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEndComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
