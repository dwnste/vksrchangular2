import * as fetchJsonp from 'fetch-jsonp';


export class ProfileService {
    getData(id) {
        const url = `//api.vk.com/method/users.get?user_ids=${id}&fields=photo_200&name_case=nom`
        return fetchJsonp(url)
                .then( response => response.json())
                .then( ({ response }) => {
                            console.log(response);
                            const [data, ...length] = response;
                            return {data, length};
                        })
                .catch( ex => console.log('parsing failed', ex) );
    };
}
