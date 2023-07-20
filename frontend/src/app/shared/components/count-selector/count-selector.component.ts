import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'count-selector',
  templateUrl: './count-selector.component.html',
  styleUrls: ['./count-selector.component.scss']
})
export class CountSelectorComponent {

  @Output() onCountChange:EventEmitter<number> = new EventEmitter<number>()

  @Input() count: number = 1;

  constructor() {
  }

  countChange() {
    this.onCountChange.emit(this.count);
  }

  decreaseCount() {
    if (this.count > 1) {
      this.count--;
      this.countChange();
    }
  }

  increaseCount() {
    this.count++;
    this.countChange();
  }
}
