import { Component, OnInit } from '@angular/core';
import { Breakfast } from 'src/app/models/breakfast.model';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-predefined-breakfast',
  templateUrl: './predefined-breakfast.component.html',
  styleUrls: ['./predefined-breakfast.component.scss'],
})
export class PredefinedBreakfastComponent implements OnInit {
  breakfastOptions: Breakfast[] = Array<Breakfast>(8);

  constructor(private readonly _modal: ModalService) {}

  ngOnInit(): void {}

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
