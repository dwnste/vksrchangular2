import * as fetchJsonp from 'fetch-jsonp';


export class MapService {
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
}
