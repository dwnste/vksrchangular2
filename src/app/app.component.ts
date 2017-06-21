import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { AppService } from './app.service';

import * as moment from 'moment'

moment.locale('ru');

const MAP_CENTER = {
  lat: 55.753994,
  lng: 37.622093
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  photos = [];
  offset = 0;
  available = 0;

  marker = {
    lat: MAP_CENTER.lat,
    lng: MAP_CENTER.lng
  }

  map = {
    lat: MAP_CENTER.lat,
    lng: MAP_CENTER.lng
  }

  @ViewChild('content') content: ElementRef;

  constructor(private appService: AppService) {
  }

  update = ({coords, radius = 1000, count = 50, offset = this.offset}) => {
    if (offset === 0) {
      this.photos = [];
      this.offset = 0;
    }

    if (this.offset <= this.available) {
      this.appService.getData({coords, radius, count, offset: this.offset}).then((resp: any) => {
        this.available = resp.photosAvailable;
        this.photos = this.photos.concat(resp.photos.map(photo => {
          photo.created = moment(photo.created * 1000).format('L')
          return photo}));
          this.offset += count;
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

  ngAfterViewInit() {
    this.update({coords: [this.marker.lat, this.marker.lng]})
  }
}
