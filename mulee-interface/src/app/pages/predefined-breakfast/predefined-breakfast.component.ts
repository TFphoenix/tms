import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Breakfast } from 'src/app/models/breakfast.model';
import { Ingredient, NutritionalValue } from 'src/app/models/ingredient.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { groupBy, sumBy } from 'lodash';

@Component({
  selector: 'app-predefined-breakfast',
  templateUrl: './predefined-breakfast.component.html',
  styleUrls: ['./predefined-breakfast.component.scss'],
})
export class PredefinedBreakfastComponent implements OnInit {
  breakfastOptions: Breakfast[] = Array<Breakfast>(8);
  selectedOption?: Breakfast;
  liquids: string[] = [];
  selectedLiquidIndex?: number;
  selectedLiquid?: string;

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

    this._api.getLiquids().subscribe({
      next: (values) => {
        this.liquids = values;
        this.selectedLiquidIndex = 0;
        this.selectedLiquid = this.liquids[this.selectedLiquidIndex];
      },
      error: (err) => {
        this._toastr.error(err.message, 'Error fetching liquids');
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
    switch (id) {
      case 'details-modal':
        this.prepareSelectedBreakfast();
        break;
      default:
        break;
    }

    this._modal.close(id);
  }

  prepareSelectedBreakfast() {
    if (!this.selectedOption || this.selectedLiquidIndex === undefined) {
      this._toastr.error('Wrong selected breakfast/liquid', 'Selection Error');
      return;
    }

    this._api
      .postPredefinedBreakfast(this.selectedOption, this.selectedLiquid ?? '')
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

    const unique = groupBy(nutritionalValues, (i) => i.name);

    const result = Object.keys(unique).map((key) => {
      const first = unique[key][0];
      return {
        ...first,
        percentage:
          sumBy(unique[key], (i) => i.percentage ?? 0) /
          Object.keys(unique).length,
      };
    });

    return result;
  }
}
