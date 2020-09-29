import React, { useState, useEffect } from 'react';
import { getRandomStrForTrackSearch } from "./utils";
import { getASpotifyTrackFromRandomStr, handleLikedTrack } from "./APIController"
import heart from './assets/images/heart.svg'

export default function Like(props) {
    var { updatePlayerTrack, updateCount, currentTrack, playlist, user, authToken, updatePlaylist } = props;
    //need to fix the state here;
    const [searchStr, getSearchStr] = useState('brandnewday');
    const [track, getTrack] = useState("4WhyHQ2BXi2VU1iaFbF6jv");
    const [message, getMessage] = useState("Message blank")

    //maybe set track outside state, so component holds it until necessary to pass back

    useEffect(() => {
        async function getData() {
            let newTrackId = await getASpotifyTrackFromRandomStr(getRandomStrForTrackSearch())
            if (newTrackId) {
                console.log("inside the Like useEffect function with: " + newTrackId)
                //set Like State trac
                getTrack(newTrackId);
            } else console.log("did not receive newTrack in Like.js")
        } getData()
    }, [searchStr]);

    async function handleLike() {
        console.log('inside the like')
        let output;
            debugger;
            if (playlist) {
                debugger;
                await handleLikedTrack(user, currentTrack, authToken, playlist)
                    .then((response) => {
                        output = response                       
                    }).catch(er => console.log(er))

            } else if (!playlist) {
                debugger;
                await handleLikedTrack(user, currentTrack, authToken)
                    .then((response) => {
                        output = response;
                    }).catch(er => console.log(er))
            } 
        
 
            debugger;
            if (output) {
                //update the playlistId in Player State
                updatePlaylist(output[0]);
                //update the message in Like State
                getMessage(output[1]);
                //update trackId in Player State; 
                updatePlayerTrack(track);
                //update Count in Player State;
                updateCount(1);
            }      
    }


    return (
        <div className='Like'>
            <p>Like is holding the next track Id: {track}</p>
            <a onClick={handleLike} onChange={() => track}>
                <img src={heart} alt='Heart Icon' style={{ height: 50, width: 50 }} />
            </a>
        </div>
    )
}