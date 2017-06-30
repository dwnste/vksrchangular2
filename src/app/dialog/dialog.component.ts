import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AbstractControl } from '@angular/forms';
import { AppService } from '../app.service';
import { MapService } from '../map/map.service';
import { Router, NavigationExtras } from '@angular/router';

function floatValidator(ctrl: AbstractControl) {}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Output() panTo = new EventEmitter<boolean>();
  @ViewChild('content') content: ElementRef;

  constructor(public dialog: MdDialog,
              private mapService: MapService,
              private router: Router,
              private emmiterService: AppService) {}

  submitForm(formData) {
    this.mapService.state.markerCoords = {lat: parseFloat(formData.lat), lng: parseFloat(formData.long)};
    this.emmiterService.setPanStatus(true);
    this.mapService
      .update({coords: [formData.lat, formData.long], radius: formData.radius, offset: 0})
      .then(() => {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                lat: formData.lat,
                lng: formData.long
            }
        };

        this.router.navigate([''], navigationExtras);
    });
  }

  ngOnInit() {
  }

}
