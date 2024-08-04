import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSculpturePageComponent } from './add-sculpture-page.component';

describe('AddSculpturePageComponent', () => {
  let component: AddSculpturePageComponent;
  let fixture: ComponentFixture<AddSculpturePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSculpturePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSculpturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
