import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguredSculptureComponent } from './configured-sculpture.component';

describe('ConfiguredSculptureComponent', () => {
  let component: ConfiguredSculptureComponent;
  let fixture: ComponentFixture<ConfiguredSculptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguredSculptureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguredSculptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
