import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SculpturesDetailsPageComponent } from './sculptures-details-page.component';

describe('SculpturesDetailsPageComponent', () => {
  let component: SculpturesDetailsPageComponent;
  let fixture: ComponentFixture<SculpturesDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SculpturesDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SculpturesDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
