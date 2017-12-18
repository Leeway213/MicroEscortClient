import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.css']
})
export class LabelListComponent implements OnInit {

  @Input() objects: any[];

  @Output() onLabeled = new EventEmitter();

  colors: string[] = [
    'red',
    'green',
    'blue',
    'yellow',
    'azure'
  ];

  constructor() { }

  ngOnInit() {
  }

  onClick(i: number) {
    this.onLabeled.emit({label: this.objects[i], color: this.colors[i]});
  }

}
