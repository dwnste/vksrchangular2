import * as fetchJsonp from 'fetch-jsonp';
import { Component } from '@angular/core';

const getPhotos = ({coords, radius, count, offset}) => {
    const [lat, long] = coords;
    const url = `//api.vk.com/method/photos.search?lat=${lat}&long=${long}&radius=${radius}&count=${count}&offset=${offset}`;
    return fetchJsonp(url)
            .then( response => response.json())
            .then( ({ response }) => {
                        let [photosAvailable, ...photos] = response;
                        return {photosAvailable, photos};
                    })
            .catch( ex => console.log('parsing failed', ex) );
}


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
  photos;

  marker = {
    lat: this.MAP_CENTER.lat,
    lng: this.MAP_CENTER.lng
  }

  mapClicked($event) {
    this.marker.lat = $event.coords.lat
    this.marker.lng = $event.coords.lng
    console.log($event)
  }
  onScroll () {
    console.log('scrolled!!')
    const coords = [this.marker.lat, this.marker.lng]
    getPhotos({coords, radius: 1000, count: 50, offset: 0}).then((photos: any) => {
      this.photos = photos;
    })
  }

  placemarkDragEnd($event) {
    console.log($event);
  }
}