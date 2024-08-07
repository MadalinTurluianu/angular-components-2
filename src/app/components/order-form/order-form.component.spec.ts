import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderFormComponent } from './order-form.component';
import { MATERIALS, MATERIALS_INFO } from '../../constants';
import { MOCKED_SCULPTURES } from '../../mocked-data';
import { MOCKED_ORDERS } from '../../mocked-data/orders';
import { By } from '@angular/platform-browser';
import { Material } from '../../types';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFormComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;

    component.materials = MATERIALS;
    component.materialsInfo = MATERIALS_INFO;
    component.sculptures = MOCKED_SCULPTURES;
    component.order = undefined;

    fixture.detectChanges();
  });

  it('should show input data if exists', () => {
    fixture.componentRef.setInput('order', MOCKED_ORDERS[0]);
    fixture.detectChanges();

    const nameInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-input"]'
    );
    expect(nameInput?.value).toEqual(MOCKED_ORDERS[0].buyerName);

    const addressInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="address-input"]'
    );
    expect(addressInput?.value).toEqual(MOCKED_ORDERS[0].buyerDeliveryAddress);
  });
  it('should show error message if buyer name not valid and form is dirty', () => {
    const nameInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-input"]'
    );

    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const nameError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-error"]'
    );

    expect(nameError?.textContent).toBeTruthy();
  });
  it('should show error message if buyer name not valid and form is submitted', () => {
    const orderForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="order-form"]'
    );

    orderForm?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const nameError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-error"]'
    );

    expect(nameError?.textContent).toBeTruthy();
  });
  it('should show error message if buyer delivery address not valid and form is dirty', () => {
    const addressInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="address-input"]'
    );

    addressInput.dispatchEvent(new Event('input'));
    addressInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const emptyListError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="address-error"]'
    );

    expect(emptyListError?.textContent).toBeTruthy();
  });
  it('should show error message if buyer delivery address not valid and form is submitted', () => {
    const orderForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="order-form"]'
    );

    orderForm?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const emptyListError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="address-error"]'
    );

    expect(emptyListError?.textContent).toBeTruthy();
  });
  it('should show error if there are no configured sculptures when submitted', () => {
    const orderForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="order-form"]'
    );

    orderForm?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const emptyListError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="empty-list-error"]'
    );

    expect(emptyListError?.textContent).toBeTruthy();
  });
  it('should show error message if weight is over 100kg and form is submitted', () => {
    const orderForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="order-form"]'
    );

    const addButton = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="add-button"]'
    );

    const materialSelect = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="material-select"]'
    );

    const sculptureSelect = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="sculpture-select"]'
    );

    sculptureSelect.value = fixture.componentInstance.sculptures[2].name;
    sculptureSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    materialSelect.value = fixture.componentInstance.materials[2];
    materialSelect.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    addButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    addButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    addButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    addButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    addButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    orderForm?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const weightError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="weight-error"]'
    );

    //expect(fixture.componentRef.instance).not.toBeTruthy();
  });
});
