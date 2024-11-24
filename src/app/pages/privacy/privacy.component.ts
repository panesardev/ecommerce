import { Component } from '@angular/core';
import { BRAND } from '@app/app.constants';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
})
export default class PrivacyComponent {
  BRAND = BRAND;
}
