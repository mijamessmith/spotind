import axios from 'axios';

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




async function checkIfUserHasPlaylist(authTokenFromParam) {
    let output;
    let address = "https://api.spotify.com/v1/me/playlists"
    debugger;
    await axios({
        method: 'GET',
        url: address,
        responseType: 'json',
        headers: {
            'Authorization': 'Bearer ' + authTokenFromParam,
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log('got the playlists:' + response);
        debugger;
        let items = response.data.items
        let play = items.filter((ps) => ps.name == 'Testing Axios Playlist')
        debugger;
        if (play.length > 0) {
            let playlistId = play[0].id
            output = [true, playlistId];
            return [true, playlistId];

        } else if (play.length == 0) {
            console.log('no app playlist yet')
           output = [false, null]
            return [false, null]
        }
    }).catch((err) => console.log(err));
    return output;
}


async function createNewPlaylist(userIdFromParam, authTokenFromParam) {

    //needs userIdFromParam, authTokenFromParam
    let output;
    let address = "https://api.spotify.com/v1/users/" + userIdFromParam + "/playlists"
        debugger;
    await axios({
        method: 'POST',
        url: address,
        responseType: 'json',
        headers: {
            'Authorization': 'Bearer ' + authTokenFromParam,
            "Content-Type": "application/json"
        },
        data: {
            name: "Testing Axios Playlist"
        }
    }).then(response => {
        output = response.data.id;
        return response.data.id;
    }).catch((err) => console.log(err));
    return output;
}


async function addTrackToPlaylist(trackIdFromParam, PlaylistId, authTokenFromParam) {
    //need trackIdFromParam, PlaylistId, authTokenFromParam
    let output;
    let trackIdParam = ["spotify:track:" + trackIdFromParam] //must be an array of uris
    let address = "https://api.spotify.com/v1/playlists/" + PlaylistId + "/tracks"
        debugger;
        await axios({
            method: 'POST',
            url: address,
            responseType: 'json',
            headers: {
                'Authorization': 'Bearer ' + authTokenFromParam,
                "Content-Type": "application/json"
            },
            data: {
                uris: trackIdParam
            }
        }).then(response => {
            console.log('posted track to playlist. ' + response)
            debugger;
            output = true;
           return true     
        }).catch((err) => console.log(err));
    return output;
}


async function handleLikedTrack(userID, trackID, authT, stateStoredPlaylistId = null, callBackFunction = null) {

    let userIdFromParam = userID;
    let trackIdFromParam = trackID;
    let authTokenFromParam = authT
    let PlaylistId = stateStoredPlaylistId;
    //let handleLikeOutput;


    if (stateStoredPlaylistId) {
        await addTrackToPlaylist(trackIdFromParam, PlaylistId, authTokenFromParam)
            .then((res) => {
                console.log('finished adding track' + res);
                debugger;
            }).catch((er) => console.log(er));

    } else if (!stateStoredPlaylistId) {
        //check if user has playlist
        await checkIfUserHasPlaylist(authTokenFromParam)
            .then(async (res) => {
                console.log('finished checking if user has playlist:' + res);
                debugger;
                if (res[0] == true) {
                    //set playlist Id
                    PlaylistId = res[1]
                    debugger;
                    //add to track
                    await addTrackToPlaylist(trackIdFromParam, PlaylistId, authTokenFromParam)
                        .then((res) => {
                            console.log('finished adding track' + res);
                            debugger;
                        }).catch((er) => console.log(er));
                }

                else if (res[0] == false) {
                    //create new playlist
                    await createNewPlaylist(userIdFromParam, authTokenFromParam)
                        .then(async (res) => {
                            //set PlaylistId
                            PlaylistId = res;
                            debugger;
                            //add to track
                            await addTrackToPlaylist(trackIdFromParam, res, authTokenFromParam)
                                .then((res) => {
                                    console.log('finished adding track' + res);
                                    debugger;
                                }).catch((er) => console.log(er));
                        })
                }
            }).catch((er) => console.log(er));
        //if so, call add to track
    }
    return [PlaylistId, "Completed a Like Click"]
}
   



export { getASpotifyTrackFromRandomStr, handleLikedTrack}