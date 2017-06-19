import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {

  MAP_CENTER = {
    lat: 55.753994,
    lng: 37.622093
  }

  marker = {
    lat: this.MAP_CENTER.lat,
    lng: this.MAP_CENTER.lng
  }

  mapClicked($event) {
    this.marker.lat = $event.coords.lat
    this.marker.lng = $event.coords.lng
  }
  placemarkDragEnd($event) {
    console.log($event);
  }
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}