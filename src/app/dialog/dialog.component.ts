import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  selectedOption: string;

  constructor(public dialog: MdDialog) {}

  submitForm(formData) {
    console.log(formData);
  }

  ngOnInit() {
  }

}
