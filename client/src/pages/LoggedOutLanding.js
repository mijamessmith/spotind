import React, { useContext } from "react"

import Layout from '../Layout';

export default function loggedOutLanding() {

    return (
        <div className='loggedOutLanding'>
            <Layout loggedIn={false}/>
            <div className="LinkToLogIn">
                <a className="LinkToLogIn-a" href='http://localhost:8888/'>Log Into Spotify</a>
            </div>
        </div>
        )
}
