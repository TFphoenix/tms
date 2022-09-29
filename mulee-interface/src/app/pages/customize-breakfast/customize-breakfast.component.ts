import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ingredient, IngredientValue } from 'src/app/models/ingredient.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-customize-breakfast',
  templateUrl: './customize-breakfast.component.html',
  styleUrls: ['./customize-breakfast.component.scss'],
})
export class CustomizeBreakfastComponent implements OnInit {
  ingredients: IngredientValue[] = [];
  liquids: string[] = [];
  selectedLiquid?: string;

  constructor(
    private readonly _api: ApiService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._api.getIngredients().subscribe({
      next: (values) => {
        this.ingredients = [];
        values.forEach((value) => {
          this.ingredients.push(new IngredientValue(value));
        });
      },
      error: (err) => {
        this._toastr.error(err.message, 'Error fetching ingredients');
      },
    });

    this._api.getLiquids().subscribe({
      next: (values) => {
        this.liquids = values;
        this.selectedLiquid = this.liquids[0];
      },
      error: (err) => {
        this._toastr.error(err.message, 'Error fetching liquids');
      },
    });
  }

  rangeValueChanged(value: number, name?: string) {
    let ingredient = this.ingredients.find(
      (ingredient) => ingredient.name === name
    );

    if (ingredient) {
      ingredient.grams = value;
    }
  }

  prepareCustomizedBreakfast() {
    this._api
      .postCustomizedBreakfast(this.ingredients, this.selectedLiquid ?? '')
      .subscribe({
        next: (values) => {
          this._toastr.success(
            'Preparation successfully started',
            'Preparation Start'
          );
          console.log(values);
        },
        error: (err) => {
          this._toastr.error('Preparation error occured', 'Preparation Error');
          console.error(err);
        },
      });
  }
}
