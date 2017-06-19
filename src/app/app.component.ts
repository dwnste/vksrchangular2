import { Component } from '@angular/core';
import { MapMouseEvent } from 'angular2-yandex-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 name:string;
 
  constructor() {
    this.name = 'Angular2'
  }
   lt = '55.76';
   lg = '37.64';
   markers: any[] = [
	  {
		  lat: 55.847,
		  lng: 38.6,
		  balloonHeader: '22U',
      balloonBody: '<img class="page_avatar_img" src="https://pp.vk.me/c836238/v836238142/1fa2b/G4XOGyOyn9g.jpg" alt="Александр  Шатилов" width="200" height="200">',
      balloonFooter: 'Footette',
      draggable: true
	  },
    {
		  lat: 55.847,
		  lng: 37.6,
		  balloonHeader: '22U',
      balloonBody: '<img class="page_avatar_img" src="https://pp.vk.me/c836238/v836238142/1fa2b/G4XOGyOyn9g.jpg" alt="Александр  Шатилов" width="200" height="200">',
      balloonFooter: 'Footette',
      draggable: true
	  }
  ];

    markerDragEnd(m: any, $event: MapMouseEvent) {
      m.lat = $event.lat;
      m.lng = $event.lng;
  }
}
