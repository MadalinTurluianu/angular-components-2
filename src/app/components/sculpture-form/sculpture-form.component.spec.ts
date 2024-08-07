import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SculptureFormComponent } from './sculpture-form.component';
import { MOCKED_SCULPTURES } from '../../mocked-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Sculpture } from '../../types';

describe('SculptureFormComponent', () => {
  let component: SculptureFormComponent;
  let fixture: ComponentFixture<SculptureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SculptureFormComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SculptureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show input data if exists', () => {
    fixture.componentRef.setInput('sculpture', MOCKED_SCULPTURES[0]);
    fixture.detectChanges();

    const nameInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-input"]'
    );
    expect(nameInput.value).toEqual(MOCKED_SCULPTURES[0].name);

    const priceInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="price-input"]'
    );
    expect(priceInput?.value).toEqual(
      MOCKED_SCULPTURES[0].basePrice.toString()
    );

    const weightInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="weight-input"]'
    );
    expect(weightInput?.value).toEqual(
      MOCKED_SCULPTURES[0].baseWeight.toString()
    );
  });

  it('should show error message if name not valid and form is dirty', () => {
    const nameInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-input"]'
    );

    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const nameError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-error"]'
    );

    expect(nameError.textContent).toBeTruthy();
  });

  it('should show error message if name not valid and form is submitted', () => {
    const orderForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="sculpture-form"]'
    );

    orderForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const nameError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-error"]'
    );

    expect(nameError.textContent).toBeTruthy();
  });

  it('should show error message if price not valid and form is dirty', () => {
    const priceInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="price-input"]'
    );

    priceInput.dispatchEvent(new Event('input'));
    priceInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const priceError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="price-error"]'
    );

    expect(priceError.textContent).toBeTruthy();
  });

  it('should show error message if price not valid and form is submitted', () => {
    const orderForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="sculpture-form"]'
    );

    orderForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const priceError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="price-error"]'
    );

    expect(priceError.textContent).toBeTruthy();
  });

  it('should show error message if weight not valid and form is dirty', () => {
    const weightInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="weight-input"]'
    );

    weightInput.dispatchEvent(new Event('input'));
    weightInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const weightError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="weight-error"]'
    );

    expect(weightError.textContent).toBeTruthy();
  });

  it('should show error message if weight not valid and form is submitted', () => {
    const weightForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="sculpture-form"]'
    );

    weightForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const weightError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="weight-error"]'
    );

    expect(weightError.textContent).toBeTruthy();
  });

  it('should return return the correct sculpture created', () => {
    const desiredFormData: Sculpture = MOCKED_SCULPTURES[0];
    let resultSculpture: Sculpture | undefined;

    spyOn(fixture.componentInstance.safeSubmit, 'emit').and.callThrough();
    fixture.componentInstance.safeSubmit.subscribe((sculpture) => {
      resultSculpture = { ...sculpture, id: desiredFormData.id };
    });

    const sculptureForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="sculpture-form"]'
    );

    const nameInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-input"]'
    );
    nameInput.value = desiredFormData.name;
    nameInput.dispatchEvent(new Event('input'));

    const priceInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="price-input"]'
    );
    priceInput.value = desiredFormData.basePrice;
    priceInput.dispatchEvent(new Event('input'));

    const weightInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="weight-input"]'
    );
    weightInput.value = desiredFormData.baseWeight;
    weightInput.dispatchEvent(new Event('input'));

    sculptureForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(fixture.componentInstance.safeSubmit.emit).toHaveBeenCalled();
    expect(resultSculpture).toEqual(desiredFormData);
  });
});
