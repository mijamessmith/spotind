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
    const [trackDislikeCount, changeTrackDislikeCount] = useState(0);

    //state updater functions to be passed as props

    const updateTrack = (tID) => {
        changeTrackId(tID)
    }

    const updateTrackLikeCount = (TLC) => {
        //how to increment? Can we add one in changeTrackLikecount
        changeTrackLikeCount(trackLikeCount + TLC); 
        updateTrackStr();
    }

    const updateDislikeCount = (TLC) => {
        changeTrackDislikeCount(trackDislikeCount + TLC);
        updateTrackStr();
    }


    const updatePlaylistId = (pID) => {
        getplayListId(pID);
    }

    const updateTrackStr = () => {
        async function getData() {
            let newTrackId = await getASpotifyTrackFromRandomStr(getRandomStrForTrackSearch())
            if (newTrackId) {
                console.log("inside the Player useEffect function with: " + newTrackId)
                changeTrackId(newTrackId);        
            } else console.log("did not receive newTrack in Dislike.js")
        } getData()
    };

    return (
        <div className="player">
            <EmbeddedPlayer trackIdFromDislike={trackId} />
            <Dislike updateDislike={updateDislikeCount} />
            <Like updatePlayerTrack={updateTrack} updateCount={updateTrackLikeCount} currentTrack={trackId} user={userId} authToken={authToken} playlist={playlistId} updatePlaylist={updatePlaylistId} />
        </div>
        
        )
}

export default Player;