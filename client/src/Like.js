import React, { useState, useEffect } from 'react';
import { getRandomStrForTrackSearch } from "./utils";
import { getASpotifyTrackFromRandomStr, handleLikedTrack } from "./APIController"
import heart from './assets/images/heart.svg'

export default function Like(props) {
    var { updatePlayerTrack, updateCount, currentTrack, playlist, user, authToken, updatePlaylist } = props;

    console.log(updatePlayerTrack, currentTrack, playlist, user, authToken, updatePlaylist);
    debugger;


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
        async function wait() {
            debugger;
            if (playlist) {
                let data = await handleLikedTrack(user, currentTrack, authToken, playlist)
                    .then()
                debugger;
                return data
            } else if (!playlist) {
                let data = await handleLikedTrack(user, currentTrack, authToken);
                debugger;
                return data
            }
        }
        //getting result before function call...
        let result;
        wait().then(data => {
            result = data
            debugger;
            if (result) {
                //update the playlistId in Player State
                updatePlaylist(result[0]);
                //update the message in Like State
                getMessage(result[1]);
                //update trackId in Player State; 
                updatePlayerTrack(track);
                //update Count in Player State;
                updateCount(1);
            }
        }).catch(er => console.log(er));
        
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