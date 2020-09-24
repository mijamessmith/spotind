import React, { useState, useEffect } from 'react'
import EmbeddedPlayer from './EmbeddedPlayer'
import Dislike from './Dislike';



function Player() {
    const [trackId, changeTrackId] = useState('');


    const updateTrack = (tID) => {
        changeTrackId(tID)
    }
   
    return (
        <div className="player">
            <EmbeddedPlayer trackIdFromDislike={trackId}/>
            <Dislike updateParent={updateTrack} />
        </div>
        
        )
}

export default Player;