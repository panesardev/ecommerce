import { Component } from '@angular/core';
import { BRAND } from '@app/app.constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export default class AboutComponent {
  BRAND = BRAND;
}
