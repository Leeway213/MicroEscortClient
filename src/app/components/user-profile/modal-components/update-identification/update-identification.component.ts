import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-identification',
  templateUrl: './update-identification.component.html',
  styleUrls: ['./update-identification.component.css']
})
export class UpdateIdentificationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  update(): boolean {
    console.log("update identification");
    return false;
  }

}
