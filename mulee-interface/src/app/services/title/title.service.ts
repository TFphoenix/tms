import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  title: string = 'MENU';

  constructor() {}

  getTitle(): string {
    return this.title;
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }
}
