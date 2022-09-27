import { Component, OnInit } from '@angular/core';
import { Breakfast } from 'src/app/models/breakfast.model';

@Component({
  selector: 'app-predefined-breakfast',
  templateUrl: './predefined-breakfast.component.html',
  styleUrls: ['./predefined-breakfast.component.scss'],
})
export class PredefinedBreakfastComponent implements OnInit {
  breakfastOptions: Breakfast[] = Array<Breakfast>(8);

  constructor() {}

  ngOnInit(): void {}
}
