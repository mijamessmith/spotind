import React, { useState, useEffect } from 'react'
import EmbeddedPlayer from './EmbeddedPlayer'
import Dislike from './Dislike';
import Like from './Like'
import { getRandomStrForTrackSearch } from "./utils";
import { getASpotifyTrackFromRandomStr } from "./APIController"

function Player(props) {

    var { authToken, userId } = props;

    const [trackId, changeTrackId] = useState('');
    const [playlistId, getplayListId] = useState(null);
    const [trackLikeCount, changeTrackLikeCount] = useState(0);

    //state updater functions to be passed as props

    const updateTrack = (tID) => {
        changeTrackId(tID)
    }

    const updateTrackLikeCount = (TLC) => {
        //how to increment? Can we add one in changeTrackLikecount
        changeTrackLikeCount(trackLikeCount + TLC); 
    }

    const updatePlaylistId = (pID) => {
        getplayListId(pID);
    }

    //useEffect(() => {
    //    async function getData() {
    //        let newTrackId = await getASpotifyTrackFromRandomStr(searchStr)
    //        if (newTrackId) {
    //            console.log("inside the dislike useEffect function with: " + newTrackId)
    //            getTrack(newTrackId);
    //            updateParent(newTrackId);
    //        } else console.log("did not receive newTrack in Dislike.js")
    //    } getData()
    //}, [searchStr]);

    //<Like updateParent={updateTrack} currentPlaylist={updatePlaylistId} />
    return (
        <div className="player">
            <EmbeddedPlayer trackIdFromDislike={trackId}/>
            <Dislike updateParent={updateTrack} />
            <Like updatePlayerTrack={updateTrack} updateCount={updateTrackLikeCount} currentTrack={trackId} user={userId} authToken={authToken} playlist={playlistId} updatePlaylist={updatePlaylistId} />
        </div>
        
        )
}

export default Player;