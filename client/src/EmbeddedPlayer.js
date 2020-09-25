import React, { useState, useEffect } from 'react';

function EmbeddedPlayer({ trackIdFromDislike }) {
    const [iframeSongId, getiframeSongId] = useState("4WhyHQ2BXi2VU1iaFbF6jv")

    useEffect(() => {
        getiframeSongId(trackIdFromDislike);
        //enable autoplay of function: currently doesn't work
        document.querySelector('[title="spotifyPlayer"]').click();
    }, [trackIdFromDislike]);


    var iframeSRC = "https://open.spotify.com/embed/track/" + iframeSongId
    return (
        <div className="EmbeddedPlayer">
            <iframe title="spotifyPlayer" src={iframeSRC} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
        )
} 

export default EmbeddedPlayer