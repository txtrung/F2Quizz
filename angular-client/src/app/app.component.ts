import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['vi']);
    // @ts-ignore
    if (localStorage.getItem('locale')) {
      // @ts-ignore
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/vi/) ? browserLang : 'vi');
    } else {
      // @ts-ignore
      localStorage.setItem('locale', 'vi');
      translate.setDefaultLang('vi');
    }
  }
}
