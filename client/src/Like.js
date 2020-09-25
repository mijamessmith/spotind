import React, { useState, useEffect } from 'react';
import { getRandomStrForTrackSearch } from "./utils";
import { getASpotifyTrackFromRandomStr } from "./APIController"
import heart from './assets/images/heart.svg'

export default function Like(props) {
    var { updateParent, currentTrack } = props;
    const [searchStr, getSearchStr] = useState('brandnewday');
    const [track, getTrack] = useState("4WhyHQ2BXi2VU1iaFbF6jv");
   

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
        await currentTrack
        () => getSearchStr(getRandomStrForTrackSearch())
    }


    return (
        <div className='Dislike'>
            <p>The current track is {track}</p>
            <a onClick={() => handleLike} onChange={() => track}>
                <img src={heart} alt='Heart Icon' style={{ height: 50, width: 50 }} />
            </a>
        </div>
    )
}