import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Breakfast } from 'src/app/models/breakfast.model';
import { Ingredient, NutritionalValue } from 'src/app/models/ingredient.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-predefined-breakfast',
  templateUrl: './predefined-breakfast.component.html',
  styleUrls: ['./predefined-breakfast.component.scss'],
})
export class PredefinedBreakfastComponent implements OnInit {
  breakfastOptions: Breakfast[] = Array<Breakfast>(8);
  selectedOption?: Breakfast;

  constructor(
    private readonly _modal: ModalService,
    private readonly _api: ApiService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._api.getPredefinedBreakfast().subscribe({
      next: (values) => {
        this.breakfastOptions = values;
      },
      error: (err) => {
        this._toastr.error(err.message, 'Error fetching breakfast options');
      },
    });
  }

  openModal(id: string) {
    this._modal.open(id);
  }

  cancelModal(id: string) {
    this._modal.close(id);
  }

  closeModal(id: string) {
    this._modal.close(id);
  }

  getBreakfastCalories(breakfast?: Breakfast): number {
    let calories: number = 0;
    breakfast?.ingredients.forEach((ingredient) => {
      calories += ingredient?.calories ?? 0;
    });
    return calories;
  }

  getBreakfastNutritionalValues(breakfast?: Breakfast): NutritionalValue[] {
    let nutritionalValues: NutritionalValue[] = [];

    breakfast?.ingredients.forEach((ingredient) => {
      ingredient.nutritionalValues.forEach((value) => {
        nutritionalValues.push(value);
      });
    });

    let a = nutritionalValues.reduce((acc: NutritionalValue[], x) => {
      if (acc.find((y) => y.name === x.name)) return acc.concat([]);
      const totalPercentage = nutritionalValues
        .filter((y) => y.name === x.name)
        .map((y) => y.percentage)
        .reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
      return acc.concat([
        {
          name: x.name,
          percentage: totalPercentage,
        },
      ]);
    }, []);

    return nutritionalValues;
  }
}
