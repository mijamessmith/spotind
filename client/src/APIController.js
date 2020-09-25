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


async function handleLikedTrack(userID, trackID, authT, callBackFunction) {
    /* I'll need:
     * 1. Auth Token
     * 2. PlaylistId - get from inside the inner functions
     * 3. Userid
     * 4. Track id
     */



    let PlaylistId;
    let hasPlaylist = false;

    async function checkIfUserHasPlaylist(uid) {

        async function checkPlaylist() {
            spotifyApi.getUserPlaylists(this.state.userId)
                .then(data => {
                    console.log('got the playlists:' + data);
                    let items = data.items
                    debugger;
                    let play = items.filter((ps) => ps.name === 'Testing Playlist1')
                    debugger;
                    if (play[0] !== undefined) {
                        this.setState({
                            playlist: play[0].name,
                            playlistId: play[0].id
                        })
                    } else console.log('no app playlist yet')
                },
                    function (err) {
                        console.error(err);
                    }
                ).catch((err) => console.log(err));
        }
       
    }

    async function createNewPlaylist(uid) {
        //need to grap correct params;


        async function createATestPlaylist() {
            var id = this.state.userId
            var authToken = this.state.accessToken
            var newPlaylistId = null;
            debugger;
            let address = "https://api.spotify.com/v1/users/" + id + "/playlists"
            async function subp() {
                await axios({
                    method: 'POST',
                    url: address,
                    responseType: 'json',
                    headers: {
                        'Authorization': 'Bearer ' + authToken,
                        "Content-Type": "application/json"
                    },
                    data: {
                        name: "Testing Axios Playlist"
                    }
                }).then(response => {
                    if (response) {
                        debugger;
                        let pid = response.data.id
                        debugger;
                        newPlaylistId = pid;
                    }
                }).catch((err) => console.log(err))
            } await subp()


            this.setState({ playlistId: newPlaylistId });
        }

    }


    async function addTrackToPlaylist(userId, playlistId, trackId) {
        //add track to playlist
            //declare vars for request
            let userId = this.state.userId;
            var authToken = this.state.accessToken
            let playlistId = this.state.playlistId //must be 
            let trackIdParam = ["spotify:track:" + this.state.nowPlaying.name] //must be an array of uris
            let address = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks"
            let success;
            debugger;

            async function sub() {
                await axios({
                    method: 'POST',
                    url: address,
                    responseType: 'json',
                    headers: {
                        'Authorization': 'Bearer ' + authToken,
                        "Content-Type": "application/json"
                    },
                    data: {
                        uris: trackIdParam
                    }
                }).then(response => {
                    if (response) {
                        debugger;
                        success = true;
                        debugger;
                    }
                }).catch((err) => console.log(err))
            } await sub();

            console.log('it worked')
            debugger;       
    }

    function executeFunctionality() {

        //in this inner function we will call above functions
        //after getting values we will call the passed in setter
        //functions from the above component to set the State of:
        //playlistId, addedTrack? (a state to see how many likes?)

        //we can do that by useing the param callBackFunction

        //hasPlaylist = await checkIfUserHasPlaylist(id);
        //if (hasPlaylist === true) {
        //    //call add to playlist
        //    await addTrackToPlaylist(id, PlaylistId, track)
        //} else {
        //    await createNewPlaylist(id);
        //    hasPlaylist = true
        //}
    }

    return PlaylistId
}


export { getASpotifyTrackFromRandomStr, handleLikedTrack}