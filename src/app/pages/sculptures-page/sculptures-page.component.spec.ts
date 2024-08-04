import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SculpturesPageComponent } from './sculptures-page.component';

describe('SculpturesPageComponent', () => {
  let component: SculpturesPageComponent;
  let fixture: ComponentFixture<SculpturesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SculpturesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SculpturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
