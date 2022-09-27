import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Breakfast } from 'src/app/models/breakfast.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-predefined-breakfast',
  templateUrl: './predefined-breakfast.component.html',
  styleUrls: ['./predefined-breakfast.component.scss'],
})
export class PredefinedBreakfastComponent implements OnInit {
  breakfastOptions: Breakfast[] = Array<Breakfast>(8);

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
}
