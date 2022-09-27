import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'MENU';
  readonly titles: { [id: string]: string } = {
    '/breakfast/predefined': 'CHOOSE YOUR BREAKFAST',
    '/breakfast/customize': 'CUSTOMIZE YOUR BREAKFAST',
    '/breakfast/explore': 'EXPLORE YOUR BREAKFAST',
  };

  constructor(private readonly _router: Router) {
    _router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.title = this.titles[val.urlAfterRedirects];
      }
    });
  }
}
