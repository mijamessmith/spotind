import React, { Component, useLocation } from 'react';
import axios from "axios";
import { parse } from "query-string";
import { getRandomStrForTrackSearch, getHashParams } from "./utils";
import { getASpotifyTrackFromRandomStr } from "./APIController"
import LogOut from './LogOut';

import './assets/css/App.css';
import './assets/css/EmbeddedPlayer.css';
import EmbeddedPlayer from "./EmbeddedPlayer"
import Dislike from './Dislike'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends Component {
  constructor(props){
    super();
    const params = this.getHashParams();
    const token = params.access_token;

      if (token) {
      spotifyApi.setAccessToken(token);
      }

    this.state = {
        loggedIn: token ? true : false,
        userId : "",
        nowPlaying: { name: 'Not Checked', albumArt: '' },
        recentlyPlayed: null,
        accessToken: token,
        locationParams: {}
      }
      this.handleCreateAPlaylist = this.handleCreateAPlaylist.bind(this)
      this.getUserId = this.getUserId.bind(this)
      this.getHashParams = this.getHashParams.bind(this)
      this.createATestPlaylist = this.createATestPlaylist.bind(this)
    }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
    };

    searchForTrack() {
        spotifyApi.searchTracks('Desert Rose')
            .then( data => {
                console.log('Search by "Desert Rose"', data/*.tracks.items[0].id*/);
               //this.createATestPlaylist()
            },
            function (err) {
                console.error(err);
            }
        )
    }


    handleCreateAPlaylist() {
        return this.createATestPlaylist()
    }


    getUserId() {
        let result =  (async () => {
            let response = await axios('http://localhost:8888/getcredentials', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    withCredentials: true
                }
            })
            return response
        })();
        this.setState({userId : result})
        return result
    }

    createATestPlaylist() {
        async function PlaylistSubFunction() {
            let id = await this.getUserId()
            console.log('inside createATestPlaylist with id ' + id);
            spotifyApi.createPlaylist(id, "Playlist_Test1")
                .then(data => {
                    console.log('Created a new playlist', data);
                }).catch((err) => {
                    console.log(err)
                })
        } PlaylistSubFunction()
    }
    



    render() {
     
    return (
      <div className="App">
        <a href='http://localhost:8888/' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150, marginBottom: 50 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.searchForTrack()}>
            Search for a track
          </button>
        }
            <EmbeddedPlayer />
            <Dislike />
            <LogOut/>
        <div>
           <button onClick={() => this.handleCreateAPlaylist}>Click to create a playlist</button>
        </div>
      </div>
    );
  }
}

export default App;
