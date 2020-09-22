export default async function getASpotifyTrackFromRandomStr(searchStr) {
        spotifyApi.searchTracks('Desert Rose')
            .then(data => {
                console.log('Search by "Desert Rose"', data);
                return data.tracks.items[Math.floor(Math.random() * 20)]
            }).catch((err) => {
                console.log(err)
            })
}