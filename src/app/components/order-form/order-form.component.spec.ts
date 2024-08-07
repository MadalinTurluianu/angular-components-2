import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderFormComponent } from './order-form.component';
import { MATERIALS, MATERIALS_INFO } from '../../constants';
import { MOCKED_SCULPTURES } from '../../mocked-data';
import { MOCKED_ORDERS } from '../../mocked-data/orders';
import { By } from '@angular/platform-browser';
import { Order } from '../../types';

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
    expect(nameInput.value).toEqual(MOCKED_ORDERS[0].buyerName);

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

    expect(nameError.textContent).toBeTruthy();
  });

  it('should show error message if buyer name not valid and form is submitted', () => {
    const orderForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="order-form"]'
    );

    orderForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const nameError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-error"]'
    );

    expect(nameError.textContent).toBeTruthy();
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

    expect(emptyListError.textContent).toBeTruthy();
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

    expect(emptyListError.textContent).toBeTruthy();
  });

  it('should show error if there are no configured sculptures when submitted', () => {
    const orderForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="order-form"]'
    );

    orderForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const emptyListError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="empty-list-error"]'
    );

    expect(emptyListError.textContent).toBeTruthy();
  });

  it('should show order summary after adding configured sculpture', () => {
    const addButton = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="add-button"]'
    );

    const materialSelect = fixture.debugElement.query(
      By.css('[data-testid="material-select"]')
    );

    const sculptureSelect = fixture.debugElement.query(
      By.css('[data-testid="sculpture-select"]')
    );

    materialSelect.triggerEventHandler(
      'valueChange',
      fixture.componentInstance.materials[2]
    );
    sculptureSelect.triggerEventHandler(
      'valueChange',
      fixture.componentInstance.sculptures[2]
    );

    addButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const orderSummary = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="order-summary"]'
    );

    expect(orderSummary).toBeTruthy();
  });

  it('should show error message if weight is over 100kg and form is submitted', () => {
    const orderForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="order-form"]'
    );

    const addButton = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="add-button"]'
    );

    const materialSelect = fixture.debugElement.query(
      By.css('[data-testid="material-select"]')
    );

    const sculptureSelect = fixture.debugElement.query(
      By.css('[data-testid="sculpture-select"]')
    );

    materialSelect.triggerEventHandler(
      'valueChange',
      fixture.componentInstance.materials[2]
    );
    sculptureSelect.triggerEventHandler(
      'valueChange',
      fixture.componentInstance.sculptures[2]
    );

    addButton.dispatchEvent(new Event('click'));
    addButton.dispatchEvent(new Event('click'));
    addButton.dispatchEvent(new Event('click'));
    addButton.dispatchEvent(new Event('click'));

    orderForm?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const weightError = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="weight-error"]'
    );

    expect(weightError).toBeTruthy();
  });

  it('should return return the correct order created', () => {
    const desiredFormData: Order = MOCKED_ORDERS[0];
    let resultOrder: Order | undefined;

    spyOn(fixture.componentInstance.safeSubmit, 'emit').and.callThrough();

    fixture.componentInstance.safeSubmit.subscribe((order) => {
      resultOrder = { ...order, id: desiredFormData.id };
    });

    const orderForm = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="order-form"]'
    );

    const nameInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="name-input"]'
    );
    nameInput.value = desiredFormData.buyerName;
    nameInput.dispatchEvent(new Event('input'));

    const addressInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="address-input"]'
    );
    addressInput.value = desiredFormData.buyerDeliveryAddress;
    addressInput.dispatchEvent(new Event('input'));

    const addButton = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="add-button"]'
    );

    const materialSelect = fixture.debugElement.query(
      By.css('[data-testid="material-select"]')
    );
    const sculptureSelect = fixture.debugElement.query(
      By.css('[data-testid="sculpture-select"]')
    );

    desiredFormData.configuredSculptures.forEach((item) => {
      materialSelect.triggerEventHandler('valueChange', item.material);
      sculptureSelect.triggerEventHandler('valueChange', item.sculpture);
      addButton.dispatchEvent(new Event('click'));
    });

    orderForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(fixture.componentInstance.safeSubmit.emit).toHaveBeenCalled();
    expect(resultOrder).toEqual(desiredFormData);
  });
});
