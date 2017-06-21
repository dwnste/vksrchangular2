import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';

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
export class AppComponent implements OnInit, OnDestroy {
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

  sub;

  @ViewChild('content') content: ElementRef;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router) {}

  update = ({coords, radius = 1000, count = 50, offset = this.state.offset}) => {
    if (offset === 0) {

      this.state.photos = [];
      this.state.offset = 0;

      const navigationExtras: NavigationExtras = {
        queryParams: {
          lat: coords[0],
          long: coords[1]
        }
      };

      this.router.navigate([''], navigationExtras);
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
  /*
  getParameterByName(name: any) {
  const url = window.location.href;
  name = name.replace(/[[]]/g, '\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

    return decodeURIComponent(results[2]);
  }
  */
  ngOnInit() {
    this.route.queryParams
          .debounceTime(100)
          .subscribe((params) => {
            this.marker.lat = params.lat;
            this.marker.lng = params.long;
            this.map.lat = params.lat;
            this.map.lng = params.long;
            this.update({coords: [params.lat, params.long], offset: 0});
          });
    /*
    this.marker.lat = parseFloat(this.getParameterByName('lat')) || MAP_CENTER.lat;
    this.marker.lng = parseFloat(this.getParameterByName('long')) || MAP_CENTER.lng;
    this.map.lat = parseFloat(this.getParameterByName('lat')) || MAP_CENTER.lat;
    this.map.lng = parseFloat(this.getParameterByName('long')) || MAP_CENTER.lng;
    */

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
