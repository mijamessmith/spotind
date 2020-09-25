import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

function getASpotifyTrackFromRandomStr(searchStr) {

           return spotifyApi.searchTracks(searchStr)
            .then(data => {
                console.log('Searched:' + searchStr, data);             
                return data.tracks.items[Math.floor(Math.random() * 20)].id;
            }).catch((err) => {
                console.log(err)
            })
}


async function handleLikedTrack(id, track) {

    let PlaylistId;
    let hasPlaylist = false;

    async function checkIfUserHasPlaylist(uid) {

        spotifyApi.getUserPlaylists(uid)
            .then(data => {
                console.log('got the playlists:' + data);
                let items = data.items
                debugger;
                let play = items.filter((ps) => ps.name === 'Testing Playlist1')
                debugger;
                if (play.length !== 0) {
                    hasPlaylist = true
                    PlaylistId = play[0].id
                    return true
                } else return false
            },
                function (err) {
                    console.error(err);
                }
        ).catch((err) => console.log(err));
       
    }

    async function createNewPlaylist(uid) {
        //create a new spotify playlist with credentials
        spotifyApi.createNewPlaylist(uid, { name: "Testing Playlist1" })
            .then(data => {
                debugger;
                addTrackToPlaylist(uid, playlistId, track)
            }, function (err) {
                console.error(err);
            }
            ).catch((err) => console.log(err));

    }


    async function addTrackToPlaylist(userId, playlistId, trackId) {
        //add track to playlist
        spotifyApi.addTrackToPlaylist(userId, playlistId, [trackId])
            .then(data => {
                debugger;
                console.log(data);
            }, function (err) {
                console.error(err);
            }
            ).catch((err) => console.log(err));
    }


    var hasPlaylist = await checkIfUserHasPlaylist(id);
    if (hasPlaylist === true) {
        //call add to playlist
        await addTrackToPlaylist(id, PlaylistId, track)
    } else {
        await createNewPlaylist(id);
        hasPlaylist = true
    }

    return PlaylistId
}
    

export { getASpotifyTrackFromRandomStr, handleLikedTrack}