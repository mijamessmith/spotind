import React, { useState, useEffect } from 'react'
import EmbeddedPlayer from './EmbeddedPlayer'
import Dislike from './Dislike';
import Like from './Like'


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