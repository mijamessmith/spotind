import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

function getASpotifyTrackFromRandomStr(searchStr) {
            let track = ''

            spotifyApi.searchTracks(searchStr)
            .then(data => {
                console.log('Searched:' + searchStr, data);
                track = data.tracks.items[Math.floor(Math.random() * 20)]
            }).catch((err) => {
                console.log(err)
            })
    return track;
}

export { getASpotifyTrackFromRandomStr}