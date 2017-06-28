import { Component, ElementRef, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';

import { MapService } from './map.service';

import { DialogComponent } from '../dialog/dialog.component';

import * as qs from 'query-string'

const MAP_CENTER = {
  lat: 55.753994,
  lng: 37.622093
}

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss'],
})
export class MapComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  constructor(
    private appService: MapService,
    public dialog: MdDialog,
    public vcr: ViewContainerRef,
    private router: Router) {}


  buttonClick() {
    const config = new MdDialogConfig();
    config.viewContainerRef = this.vcr;
    this.dialog.open(DialogComponent, config);
  }

  update({coords, ...params}) {
    this.appService.update({coords, ...params}).then(() => {

      const navigationExtras: NavigationExtras = {
          queryParams: {
              lat: coords[0],
              lng: coords[1]
          }
      };

      this.router.navigate([''], navigationExtras);

      if (this.content.nativeElement.scrollHeight <= this.content.nativeElement.clientHeight) {
          this.appService.update({coords});
      }
    })
  }

  mapClicked($event) {
    console.log(this.appService.state.markerCoords)
    this.appService.state.markerCoords = {lat: $event.coords.lat, lng: $event.coords.lng};
    this.update({coords: [$event.coords.lat, $event.coords.lng], offset: 0});
  }

  onScroll () {
    this.update({ coords: [this.appService.state.markerCoords.lat, this.appService.state.markerCoords.lng] });
  }

  placemarkDragEnd($event) {
    this.update({coords: [$event.coords.lat, $event.coords.lng], offset: 0})
  }

  ngOnInit() {
    const queryParams = {
      lat: parseFloat(qs.parse(window.location.search).lat) || MAP_CENTER.lat,
      lng: parseFloat(qs.parse(window.location.search).lng) || MAP_CENTER.lng
    }

    this.appService.state.markerCoords = {...queryParams};
    this.appService.state.mapCoords = {...queryParams};

    this.update({coords: [queryParams.lat, queryParams.lng], offset: 0});
  }
}
