import React from 'react';

export default function Layout(props) {
    const {loggedIn} = props;
    return (
        <div className="Layout">
            <div className="Layout-header">Tindr/Spot</div>
            <div className="Layout-leftDiv">Left</div>
            <div className="Layout-rightDiv">Right</div>
            {!loggedIn &&
                <div className="Layout-messageDiv">This is the message Div
                <p className="Layout-messageDiv-p">Ever Wanted to experience Spotify without any track suggestions
                    or other tracking methods? Tindr/Spot is for you</p>
                </div>
            }
            <div className="Layout-footer">Footer
                <p className="Layout-footer-p">Tindr/Spot copyright 2020 under MIT</p>
            </div>
        </div>
        )
}