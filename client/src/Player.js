import React, { useState, useEffect } from 'react'
import EmbeddedPlayer from './EmbeddedPlayer'
import Dislike from './Dislike';



function Player(props) {

    var { authToken, userId } = props;

    const [trackId, changeTrackId] = useState('');
    const [playlistId, getplayListId] = useState(null);




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
            <Like updateParent={updateTrack} currentTrack={trackId} user={userId} auth={authToken} playlist={playlistId}/>
        </div>
        
        )
}

export default Player;