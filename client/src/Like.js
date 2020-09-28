import React, { useState, useEffect } from 'react';
import { getRandomStrForTrackSearch } from "./utils";
import { getASpotifyTrackFromRandomStr, handleLikedTrack } from "./APIController"
import heart from './assets/images/heart.svg'

export default function Like(props) {
    var { updateParent, updateCount, currentTrack, playlist, user, auth, updatePlaylist } = props;

    console.log(updateParent, currentTrack, playlist, user, auth, updatePlaylist);
    debugger;
    const [searchStr, getSearchStr] = useState('brandnewday');
    const [track, getTrack] = useState("4WhyHQ2BXi2VU1iaFbF6jv");
    const [message, getMessage] = useState('')

    //maybe set track outside state, so component holds it until necessary to pass back

    useEffect(() => {
        async function getData() {
            let newTrackId = await getASpotifyTrackFromRandomStr(searchStr)
            if (newTrackId) {
                console.log("inside the Like useEffect function with: " + newTrackId)
                getTrack(newTrackId);
                updateParent(newTrackId);
            } else console.log("did not receive newTrack in Like.js")
        } getData()
    }, [searchStr]);

    async function handleLike() {
        console.log('inside the like')
        async function wait() {
            debugger;
            let data = await handleLikedTrack(user, currentTrack, auth, playlist);
            return data
        }
        let result = await wait();

        if (result) {
            //update the playlistId in Player State
            updatePlaylist(result[0]);
            //update the count num in Player State
            getMessage(result[1]);
        }
    }


    return (
        <div className='Like'>
            <p>The current track is {track}</p>
            <a onClick={handleLike} onChange={() => track}>
                <img src={heart} alt='Heart Icon' style={{ height: 50, width: 50 }} />
            </a>
        </div>
    )
}