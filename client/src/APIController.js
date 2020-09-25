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

    async function checkIfUserHasPlaylist(uid) {
        //call api based on user to see playlists
        let playLists = await Spotify.getUserPlaylists(uid)
        //if user has a playlist with correct name, call add to playlist
        if (playLists.something === "blah") {
            PlaylistId === "another bleh"
            return true
        } else return false;
    }


    async function createNewPlaylist(uid) {
        //create a new spotify playlist with credentials
        await Spotify.createNewPlaylist(uid, { name: "Tinspot mixtape" })

    }


    async function addTrackToPlaylist(userId, playlistId, trackId) {
        //add track to playlist
        await Spotify.addTrackToPlaylist(userId, playlistId, [trackId])
    }


    var hasPlaylist = await checkIfUserHasPlaylist(id);
    if (hasPlaylist === true) {
        //call add to playlist
        await addTrackToPlaylist(id, PlaylistId, track)
    } else {
        await createNewPlaylist(id)
    }


}


export { getASpotifyTrackFromRandomStr, handleLikedTrack}