import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';

import { MapService } from './map.service';

import * as moment from 'moment'
import * as qs from 'query-string'

moment.locale('ru');

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
  state = {
    photos: [],
    offset: 0,
    available: 0
  }

  marker = {
    lat: MAP_CENTER.lat,
    lng: MAP_CENTER.lng
  }

  map = {
    lat: MAP_CENTER.lat,
    lng: MAP_CENTER.lng
  }

  @ViewChild('content') content: ElementRef;

  constructor(
    private appService: MapService,
    private router: Router) {}

  update = ({coords, radius = 1000, count = 50, offset = this.state.offset}) => {
    if (offset === 0) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          lat: this.marker.lat,
          lng: this.marker.lng
        }
      };

      this.router.navigate([''], navigationExtras);

      this.state.photos = [];
      this.state.offset = 0;
    }

    if (this.state.offset <= this.state.available) {
      this.appService.getData({coords, radius, count, offset: this.state.offset})
        .then((resp: any) => {
          this.state.available = resp.photosAvailable;

          this.state.photos = (
            this.state.photos.concat(
              resp.photos.map(photo => {
                photo.created = moment(photo.created * 1000).format('L');
                return photo;
              })));

            this.state.offset += count;

            if (this.content.nativeElement.scrollHeight <= this.content.nativeElement.clientHeight) {
              this.update({coords});
            }
      });
    }
  }

  mapClicked($event) {
    this.marker.lat = $event.coords.lat
    this.marker.lng = $event.coords.lng
    this.update({coords: [$event.coords.lat, $event.coords.lng], offset: 0});
  }

  onScroll () {
    this.update({coords: [this.marker.lat, this.marker.lng]});
  }

  placemarkDragEnd($event) {
    this.update({coords: [$event.coords.lat, $event.coords.lng], offset: 0})
  }

  ngOnInit() {
    const queryParams = {
      lat: parseFloat(qs.parse(window.location.search).lat) || MAP_CENTER.lat,
      lng: parseFloat(qs.parse(window.location.search).lng) || MAP_CENTER.lng
    }

    this.marker = {...queryParams};
    this.map = {...queryParams};

    this.update({coords: [this.marker.lat, this.marker.lng], offset: 0});
  }
}
