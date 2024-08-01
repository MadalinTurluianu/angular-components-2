import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SculptureDetailsComponent } from './sculpture-details.component';

describe('SculptureDetailsComponent', () => {
  let component: SculptureDetailsComponent;
  let fixture: ComponentFixture<SculptureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SculptureDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SculptureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
