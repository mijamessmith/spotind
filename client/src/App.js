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
  constructor(props){
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
        userId : userId,
        nowPlaying: { name: 'Not Checked', albumArt: '' },
        recentlyPlayed: null,
        accessToken: token,
        params: params,
        playlist: {}
      }
      this.handleCreateAPlaylist = this.handleCreateAPlaylist.bind(this)
      //this.getUserId = this.getUserId.bind(this)
      //this.getHashParams = this.getHashParams.bind(this)
      this.createATestPlaylist = this.createATestPlaylist.bind(this)
      //this.getUser = this.getUser.bind(this);
    }

    //getUser() {
    //    let user = getQueryParams();
    //    this.setState = {userId : user}
    //}

  //getHashParams() {
  //  var hashParams = {};
  //  var e, r = /([^&;=]+)=?([^&;]*)/g,
  //      q = window.location.hash.substring(1);
  //  e = r.exec(q)
  //  while (e) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //     e = r.exec(q);
  //  }
  //  return hashParams;
  //}

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

  //  setState({ userId: this.getUser() })


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


    //getUserId() {
    //    let result =  (async () => {
    //        let response = await axios('http://localhost:8888/getcredentials', {
    //            headers: {
    //                'Access-Control-Allow-Origin': '*',
    //                withCredentials: true
    //            }
    //        })
    //        return response
    //    })();
    //    this.setState({userId : result})
    //    return result
    //}

    createATestPlaylist() {
        async function PlaylistSubFunction() {
            if (this.state.userId) {
                let id = this.state.userId;
                console.log('inside createATestPlaylist with id ' + id);
                spotifyApi.createPlaylist(id, "Playlist_Test1")
                    .then(data => {
                        console.log('Created a new playlist', data);
                    }).catch((err) => {
                        console.log(err)
                    })
            } else console.log('lacking a userId');
        } PlaylistSubFunction()
    }
    

    checkPlaylist() {
        let userplayLists = await Spotify.getUserPlaylists(uid);
        this.setState = {playlist: userplayLists}
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
                <Player userId={this.state.userId}/>
                <LogOut />

                <button onClick={() => this.checkPlaylist}>Playlist?</button>

                <div>
                    <button onClick={() => this.handleCreateAPlaylist}>Click to create a playlist</button>
                </div>
                </div>
            }
      </div>
    );
  }
}

export default App;
