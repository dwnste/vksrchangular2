import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AbstractControl } from '@angular/forms';
import { MapService } from '../map/map.service';
import { Router, NavigationExtras } from '@angular/router';

function floatValidator(ctrl: AbstractControl) {}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  constructor(public dialog: MdDialog,
              private mapService: MapService,
              private router: Router) {}

  submitForm(formData) {
    this.mapService.state.markerCoords = {lat: formData.lat, lng: formData.long};
    this.mapService.state.mapCoords = {lat: formData.lat, lng: formData.long};

    this.mapService.update({coords: [formData.lat, formData.long], radius: formData.radius, offset: 0})
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
