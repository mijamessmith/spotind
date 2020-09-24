import React, { Component, useState, useEffect } from 'react';

function EmbeddedPlayer({ trackIdFromDislike }) {
    const [iframeSongId, getiframeSongId] = useState("4WhyHQ2BXi2VU1iaFbF6jv")

    useEffect(() => {
        getiframeSongId(trackIdFromDislike);
    }, [trackIdFromDislike]);


    var iframeSRC = "https://open.spotify.com/embed/track/" + iframeSongId
    return (
        <div className="EmbeddedPlayer">
            <iframe title="spotifyPlayer" src={iframeSRC} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
        )
} 




//class EmbeddedPlayer extends Component {
//    constructor(props) {
//        super()
//        this.state = {
//            trackId: "4WhyHQ2BXi2VU1iaFbF6jv"
//        }
//        this.handleEmbeddedTrack = this.handleEmbeddedTrack.bind(this);
//} 
//    handleEmbeddedTrack() {
//        let atrack = "4WhyHQ2BXi2VU1iaFbF6jv"
//        return atrack
//    }

//    render() {
//        const iframeSRC = "https://open.spotify.com/embed/track/" + `${this.state.trackId}`
//        return (
//            <div className="EmbeddedPlayer">
//                <iframe src={iframeSRC} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
//            </div>
//            )
//    }
//}

export default EmbeddedPlayer