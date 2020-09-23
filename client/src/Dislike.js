import React, { useState, useEffect } from 'react';
import { getRandomStrForTrackSearch, getHashParams } from "./utils";
import { getASpotifyTrackFromRandomStr } from "./APIController"
import dislike from './assets/images/dislike.svg'



export default function Dislike() {
    const [searchStr, getSearchStr] = useState('');
    const [track, getTrack] = useState("4WhyHQ2BXi2VU1iaFbF6jv");


    function handleClick() {
        let newTrack = getASpotifyTrackFromRandomStr(getRandomStrForTrackSearch());  
        return newTrack
    }

    function setTrack(tr) {
        getTrack(tr)
    }

    return (
        <div className='Dislike'>
            <p>The current track is {track}</p>
            <a onClick={() => handleClick()}>
                <img src={dislike} alt='Frowny-Face' style={{ height: 50, width: 50 }} />
            </a>
        </div>
        )
}


//function App() {
//    const [data, setData] = useState({ hits: [] });
//    const [query, setQuery] = useState('redux');
//    const [url, setUrl] = useState(
//        'https://hn.algolia.com/api/v1/search?query=redux',
//    );

//    useEffect(() => {
//        const fetchData = async () => {
//            const result = await axios(url);

//            setData(result.data);
//        };

//        fetchData();
//    }, [url]);

//    return (
//        <Fragment>
//            <input
//                type="text"
//                value={query}
//                onChange={event => setQuery(event.target.value)}
//            />
//            <button
//                type="button"
//                onClick={() =>
//                    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
//                }
//            >
//                Search
//      </button>

//            <ul>
//                {data.hits.map(item => (
//                    <li key={item.objectID}>
//                        <a href={item.url}>{item.title}</a>
//                    </li>
//                ))}
//            </ul>
//        </Fragment>
//    );
//}