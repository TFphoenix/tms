import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { RangeSelectorComponent } from './range-selector/range-selector.component';

@NgModule({
  declarations: [ModalComponent, RangeSelectorComponent],
  imports: [CommonModule, BrowserModule],
  exports: [ModalComponent, RangeSelectorComponent],
})
export class SharedModule {}
