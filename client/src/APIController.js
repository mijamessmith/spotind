import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

function getASpotifyTrackFromRandomStr(searchStr) {

           return spotifyApi.searchTracks(searchStr)
            .then(data => {
                console.log('Searched:' + searchStr, data);  
                debugger;
                return data.tracks.items[2].id;
            }).catch((err) => {
                console.log(err)
            })
}

export { getASpotifyTrackFromRandomStr}