import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss'],
})
export class RangeSelectorComponent implements OnInit {
  @ViewChild('rangeSlider') rangeSlider!: ElementRef<HTMLInputElement>;
  @ViewChild('rangeBullet') rangeBullet!: ElementRef<HTMLSpanElement>;
  @Output() rangeValueChangedEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  showSliderValue() {
    const value = +this.rangeSlider.nativeElement.value;
    const max = +this.rangeSlider.nativeElement.max;

    // Update label
    this.rangeBullet.nativeElement.innerHTML = value.toString();
    var bulletPosition = value / max;
    this.rangeBullet.nativeElement.style.left = bulletPosition * 300 + 'px';

    // Emit event
    this.rangeValueChangedEvent.emit(value);
  }
}
