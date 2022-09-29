import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss'],
})
export class RangeSelectorComponent implements OnInit {
  @ViewChild('rangeSlider') rangeSlider!: ElementRef<HTMLInputElement>;
  @ViewChild('rangeBullet') rangeBullet!: ElementRef<HTMLSpanElement>;

  constructor() {}

  ngOnInit(): void {}

  showSliderValue() {
    this.rangeBullet.nativeElement.innerHTML =
      this.rangeSlider.nativeElement.value;
    var bulletPosition =
      +this.rangeSlider.nativeElement.value /
      +this.rangeSlider.nativeElement.max;
    this.rangeBullet.nativeElement.style.left = bulletPosition * 300 + 'px';
  }
}
