import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeftNav } from './LeftNav';

@Component({
  selector: 'app-left-nav-panel',
  templateUrl: './left-nav-panel.component.html',
  styleUrls: ['./left-nav-panel.component.css']
})
export class LeftNavPanelComponent implements OnInit {

  @Output() navChanged = new EventEmitter();

  @Input() navs: LeftNav[] = [];

  _selectedNav: number = -1;
  get selectedNav() {
    return this._selectedNav;
  }

  @Input() set selectedNav(value: number) {
    if (this._selectedNav !== value) {
      this._selectedNav = value;
      this.navChanged.emit({
        nav: this._selectedNav,
        item: this._selectedItem
      });
    }
  }

  _selectedItem: number = -1;
  get selectedItem() {
    return this._selectedItem;
  }

  @Input() set selectedItem(value: number) {
    if (this._selectedItem !== value) {
      this._selectedItem = value;
      this.navChanged.emit({
        nav: this._selectedNav,
        item: this._selectedItem
      });
    }
  }

  constructor() { }

  ngOnInit() {
  }

  selectNav(p: number) {
    this.selectedNav = p;
    this.selectedItem = -1;
  }

  selectNavItem(p: number, i: number) {
      this.selectedItem = i;
      this.selectedNav = p;
  }

}
