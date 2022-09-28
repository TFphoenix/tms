import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-customize-breakfast',
  templateUrl: './customize-breakfast.component.html',
  styleUrls: ['./customize-breakfast.component.scss'],
})
export class CustomizeBreakfastComponent implements OnInit {
  ingredients: Ingredient[] = [];
  liquids: string[] = [];

  constructor(
    private readonly _api: ApiService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._api.getIngredients().subscribe({
      next: (values) => {
        this.ingredients = values;
      },
      error: (err) => {
        this._toastr.error(err.message, 'Error fetching ingredients');
      },
    });

    this._api.getLiquids().subscribe({
      next: (values) => {
        this.liquids = values;
      },
      error: (err) => {
        this._toastr.error(err.message, 'Error fetching liquids');
      },
    });
  }

  prepareCustomizedBreakfast() {}
}
