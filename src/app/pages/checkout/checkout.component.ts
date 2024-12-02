import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TAX } from '@app/app.constants';
import { AuthService } from '@app/auth/auth.service';
import { CartStateToken } from '@app/domains/cart/cart.state';
import { PlaceOrder, SetAddress, SetPaymentMethod, SetUser } from '@app/domains/orders/order.actions';
import { OrderStateToken } from '@app/domains/orders/order.state';
import { Store } from '@ngxs/store';
import { debounceTime, filter, firstValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
})
export default class CheckoutComponent {
  private store = inject(Store);  
  private auth = inject(AuthService);

  alertModal = viewChild.required<ElementRef<HTMLDialogElement>>('alertModal');
  orderModal = viewChild.required<ElementRef<HTMLDialogElement>>('orderModal');
  loginModal = viewChild.required<ElementRef<HTMLDialogElement>>('loginModal');

  cart = this.store.selectSignal(CartStateToken);
  order = this.store.selectSignal(OrderStateToken);

  userForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  addressForm = new FormGroup({
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    postal: new FormControl('', Validators.required),
    instructions: new FormControl(''),
  });

  paymentForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
    expiryDate: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])(\/|-)([0-9]{2})$/gm)]),
    cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
  });

  TAX = TAX;

  constructor() {
    effect(() => {
      if (this.alertModal()) {
        this.alertModal().nativeElement.showModal();
      }
    });

    this.auth.user$.pipe(
      filter(value => value != null),
      takeUntilDestroyed(),
    ).subscribe(user => this.userForm.setValue({
      displayName: user.displayName,
      email: user.email,
    }));

    this.userForm.statusChanges.pipe(
      debounceTime(300),
      map(status => status === 'VALID' ? this.userForm.getRawValue() : null),
      filter(value => value != null),
      takeUntilDestroyed(),
    ).subscribe(value => this.store.dispatch(new SetUser(value)));
    
    this.addressForm.statusChanges.pipe(
      debounceTime(300),
      map(status => status === 'VALID' ? this.addressForm.getRawValue() : null),
      filter(value => value != null),
      takeUntilDestroyed(),
    ).subscribe(value => this.store.dispatch(new SetAddress(value)));
    
    this.paymentForm.statusChanges.pipe(
      debounceTime(300),
      map(status => status === 'VALID' ? this.paymentForm.getRawValue() : null),
      filter(value => value != null),
      takeUntilDestroyed(),
    ).subscribe(value => this.store.dispatch(new SetPaymentMethod(value)));
  }

  async placeOrder() {
    const user = await firstValueFrom(this.auth.user$);
    if (user) {
      this.store.dispatch(new PlaceOrder(this.orderModal().nativeElement));
    }
    else {
      this.loginModal().nativeElement.showModal();
    }
  }

  closeOrderModal() {
    this.orderModal().nativeElement.close();
  }

  closeLoginModal() {
    this.loginModal().nativeElement.close();
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    return form.controls[fieldName].invalid && form.controls[fieldName].touched;
  }
  
}
