import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectWarningComponent } from './redirect-warning.component';

describe('RedirectWarningComponent', () => {
  let component: RedirectWarningComponent;
  let fixture: ComponentFixture<RedirectWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirectWarningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
