import * as fetchJsonp from 'fetch-jsonp';


export class ProfileService {
    getData(id) {
        const url = parseInt(id, 10) > 0
        ?
        `//api.vk.com/method/users.get?user_ids=${id}&fields=photo_200&name_case=nom`
        :
        `//api.vk.com/method/groups.get?group_id=${id}&fields=photo_200`
        console.log(url);
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
