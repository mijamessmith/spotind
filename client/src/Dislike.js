import React, { useState, useEffect } from 'react';
import { getRandomStrForTrackSearch} from "./utils";
import { getASpotifyTrackFromRandomStr } from "./APIController"
import dislike from './assets/images/dislike.svg'

export default function Dislike(props) {
    var { updateDislike } = props;
    const [searchStr, getSearchStr] = useState('brandnewday');
    const [track, getTrack] = useState("4WhyHQ2BXi2VU1iaFbF6jv");

    const handleClick = () => {
        //;
        updateDislike(1);
    }

    return (
        <div className='Dislike'>
            <a onClick={handleClick}>
                <img className='Dislike-icon' src={dislike} alt='Frowny-Face' />
            </a>
        </div>
        )
}
