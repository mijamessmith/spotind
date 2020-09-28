import React, { Component, useLocation } from 'react';
import axios from "axios";
import { parse } from "query-string";
import { getRandomStrForTrackSearch, getHashParams, getQueryParams } from "./utils";
import { getASpotifyTrackFromRandomStr } from "./APIController"
import LogOut from './LogOut';

import './assets/css/App.css';
import './assets/css/EmbeddedPlayer.css';
import Player from './Player'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends Component {
    constructor(props) {
        super();
        const params = getHashParams();
        const token = params.access_token;
        var userId;

        if (params) {
            userId = params.userId
        } else {
            userId = null;
        }


        if (token) {
            spotifyApi.setAccessToken(token);
        }

        this.state = {
            loggedIn: token ? true : false,
            userId: userId,
            nowPlaying: { name: '4WhyHQ2BXi2VU1iaFbF6jv', albumArt: '' },
            recentlyPlayed: null,
            accessToken: token,
            params: params,
            playlist: {},
            playlistId: null
        }

        this.handleCreateAPlaylist = this.handleCreateAPlaylist.bind(this)
        //this.getUserId = this.getUserId.bind(this)
        //this.getHashParams = this.getHashParams.bind(this)
        this.createATestPlaylist = this.createATestPlaylist.bind(this)
        //this.getUser = this.getUser.bind(this);
        this.checkPlaylist = this.checkPlaylist.bind(this);
        this.updatePlaylistId = this.updatePlaylistId.bind(this);
        this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
    }

    getNowPlaying() {
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                this.setState({
                    nowPlaying: {
                        name: response.item.name,
                        albumArt: response.item.album.images[0].url
                    }
                });
            }).catch((err) => console.log(err));
    };


    handleCreateAPlaylist() {
        return this.createATestPlaylist(this.state.userId);
    }


    updatePlaylistId(id) {
        debugger;
        this.setState({ playlistId: id })
    }

    async createATestPlaylist() {
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

    async addTrackToPlaylist() {
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
                  uris : trackIdParam
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

    


    checkPlaylist() {
        spotifyApi.getUserPlaylists(this.state.userId)
            .then( data => {
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

    render() {
     
    return (
      <div className="App">
        <a href='http://localhost:8888/' > Login to Spotify </a>
            {this.state.loggedIn &&
                <div className="loggedIn">
                <div>
                    Now Playing: {this.state.nowPlaying.name}
                </div>
                <div>
                    <img src={this.state.nowPlaying.albumArt} style={{ height: 150, marginBottom: 50 }} />
                </div>
                <button onClick={() => this.searchForTrack()}>
                Search for a track </button>
               
                <LogOut />
                <Player authToken={this.state.accessToken} userId={this.state.userId} />

                <button onClick={this.checkPlaylist}>Playlist?</button>
                <button onClick={this.addTrackToPlaylist}>Add Track</button>

                <div>
                    <button onClick={this.createATestPlaylist}>Click to create a playlist</button>
                </div>
                </div>
            }
      </div>
    );
  }
}

export default App;
