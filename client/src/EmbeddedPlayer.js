import React, { Component } from 'react';

class EmbeddedPlayer extends Component {
    constructor(props) {
        super()
        this.state = {
            trackId: "4WhyHQ2BXi2VU1iaFbF6jv"
        }
        this.handleEmbeddedTrack = this.handleEmbeddedTrack.bind(this);
} 
    handleEmbeddedTrack() {
        let atrack = "4WhyHQ2BXi2VU1iaFbF6jv"
        return atrack
    }

    render() {
        const iframeSRC = "https://open.spotify.com/embed/track/" + `${this.state.trackId}`
        return (
            <iframe src={iframeSRC} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            )
    }
}

export default EmbeddedPlayer