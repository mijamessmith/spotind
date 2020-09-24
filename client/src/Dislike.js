import React, { useState, useEffect } from 'react';
import { getRandomStrForTrackSearch} from "./utils";
import { getASpotifyTrackFromRandomStr } from "./APIController"
import dislike from './assets/images/dislike.svg'

export default function Dislike(props) {
    debugger;
    var { updateParent } = props;
    console.log(updateParent)
    const [searchStr, getSearchStr] = useState('brandnewday');
    const [track, getTrack] = useState("4WhyHQ2BXi2VU1iaFbF6jv");


    useEffect(() => {
             async function getData() {
                 let newTrackId = await getASpotifyTrackFromRandomStr(searchStr)
                 debugger;

                 if (newTrackId) {
                     console.log("inside the dislike useEffect function with: " + newTrackId)
                     getTrack(newTrackId);
                     updateParent(newTrackId);
                 } else console.log("did not receive newTrack in Dislike.js")
        } getData()
    }, [searchStr]);

    return (
        <div className='Dislike'>
            <p>The current track is {track}</p>
            <a onClick={() => getSearchStr(getRandomStrForTrackSearch())} onChange={() => track}>
                <img src={dislike} alt='Frowny-Face' style={{ height: 50, width: 50 }} />
            </a>
        </div>
        )
}
