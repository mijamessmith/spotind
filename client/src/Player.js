import React, { useState, useEffect } from 'react'
import EmbeddedPlayer from './EmbeddedPlayer'
import Dislike from './Dislike';



function Player() {
    const [trackId, changeTrackId] = useState('');
    const [playListId, getplayListId] = useState(null);

    //const [artist, updateArtist] = useState('');
    //const [trackName, updateTrackName] = useState('');


    const updateTrack = (tID) => {
        changeTrackId(tID)
    }

    const updatePlaylistId = (pID) => {
        getplayListId(pID);
    }

    //<Like updateParent={updateTrack} currentPlaylist={updatePlaylistId} />
    return (
        <div className="player">
            <EmbeddedPlayer trackIdFromDislike={trackId}/>
            <Dislike updateParent={updateTrack} />
        </div>
        
        )
}

export default Player;