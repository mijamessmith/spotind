const APIController = (function () {
    const clientId = '51ba49426fbd4113a06188a78f960c17';
    const clientSecret = '98ffa87064d04951ae4081bd7181993b'

    const _getToken = async () => {
        const result = await fetch('http://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'Basic' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json()
        return data.access_token;
    }

    const _getGenres = async (token) => {
        const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer' + token }
        });
        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {
        const limit = 10;
        const result = await fetch(`https://api.spotify.com` + `/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer' + token }

        });
        const data = await result.json();
        return data.playlists.items;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenres(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        }
    }

})();