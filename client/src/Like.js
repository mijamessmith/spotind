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
            //;
            if (playlist) {
                //;
                await handleLikedTrack(user, currentTrack, authToken, playlist)
                    .then((response) => {
                        output = response                       
                    }).catch(er => console.log(er))

            } else if (!playlist) {
                //;
                await handleLikedTrack(user, currentTrack, authToken)
                    .then((response) => {
                        output = response;
                    }).catch(er => console.log(er))
            } 
        
 
            //;
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
            <a onClick={handleLike} onChange={() => track}>
                <img className='Like-icon' src={heart} alt='Heart Icon' />
            </a>
        </div>
    )
}