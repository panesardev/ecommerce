import { Component } from '@angular/core';
import { BRAND } from '@app/app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export default class FooterComponent {
  BRAND = BRAND;
}
