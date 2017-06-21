import * as fetchJsonp from 'fetch-jsonp';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import * as moment from 'moment'

moment.locale('ru');

const getPhotos = ({coords, radius, count, offset}) => {
    const [lat, long] = coords;
    const url = `//api.vk.com/method/photos.search?lat=${lat}&long=${long}&radius=${radius}&count=${count}&offset=${offset}`;
    return fetchJsonp(url)
            .then( response => response.json())
            .then( ({ response }) => {
                        const [photosAvailable, ...photos] = response;
                        return {photosAvailable, photos};
                    })
            .catch( ex => console.log('parsing failed', ex) );
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  MAP_CENTER = {
    lat: 55.753994,
    lng: 37.622093
  }
  photos = [];
  offset = 0;
  available = 0;

  marker = {
    lat: this.MAP_CENTER.lat,
    lng: this.MAP_CENTER.lng
  }

  @ViewChild('content') content: ElementRef;

  update = ({coords, radius = 1000, count = 50, offset = this.offset}) => {
    if (offset === 0) {
      this.photos = [];
      this.offset = 0;
    }
    if (this.offset <= this.available) {
      getPhotos({coords, radius, count, offset: this.offset}).then((resp: any) => {
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
