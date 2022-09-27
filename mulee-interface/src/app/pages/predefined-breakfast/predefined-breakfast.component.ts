import { Component, OnInit } from '@angular/core';
import { Breakfast } from 'src/app/models/breakfast.model';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-predefined-breakfast',
  templateUrl: './predefined-breakfast.component.html',
  styleUrls: ['./predefined-breakfast.component.scss'],
})
export class PredefinedBreakfastComponent implements OnInit {
  @Output() navbarTitle = new EventEmitter<string>();
  breakfastOptions: Breakfast[] = Array<Breakfast>(8);

  constructor(private readonly _modal: ModalService) {}

  ngOnInit(): void {
    this.navbarTitle.emit('CHOOSE YOUR BREAKFAST');
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
