import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';

import * as fetchJsonp from 'fetch-jsonp';
import * as qs from 'query-string';
import * as moment from 'moment';

moment.locale('ru');

const MAP_CENTER = {
  lat: 55.753994,
  lng: 37.622093
}

@Injectable()
export class MapService {
    state = {
        markerCoords: <any>{},
        mapCoords: <any>{},
        radius: 1000,
        photos: [],
        offset: 0,
        available: 0
    }

    constructor() {}

    setState({...args}: any) {
        for (let arg of args) {
            if (`${arg}` in this.state) {
                this.state[`${arg}`] = args[`${arg}`]
            }
        }
    }

    getData({coords, radius, count, offset}) {
        const [lat, long] = coords;
        const url = `//api.vk.com/method/photos.search?lat=${lat}&long=${long}&radius=${radius}&count=${count}&offset=${offset}`;
        return fetchJsonp(url)
                .then( response => response.json())
                .then( ({ response }) => {
                            const [photosAvailable, ...photos] = response;
                            return {photosAvailable, photos};
                        })
                .catch( ex => console.log('parsing failed', ex) );
    };

    update = ({coords, radius = 1000, count = 50, offset = this.state.offset}) => {
        this.state.radius = radius;

        if (offset === 0) {
            this.state.photos = [];
            this.state.offset = 0;
        }

        return this.getData({coords, radius: this.state.radius, count, offset: this.state.offset})
            .then((resp: any) => {
                this.state.available = resp.photosAvailable;

                this.state.photos = (
                    this.state.photos.concat(
                    resp.photos.map(photo => {
                        photo.created = moment(photo.created * 1000).format('L');
                        return photo;
                    })));

                    this.state.offset += count;
                });
    }
}
