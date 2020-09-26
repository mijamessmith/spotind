import queryString from 'query-string'


function getRandomStrForTrackSearch() {
    const chars = '1234567890abcdefghijklmnopqrstuvwxyz'

    var charPosition = () => Math.floor(Math.random() * chars.length + 1)

    var wildCharPosition = Math.round(Math.random());
    var outputStr = ''

    for (let i = 0; i < 3; i++) {
        outputStr += chars[charPosition()];
    }
    if (wildCharPosition === 0) {
        outputStr = '%' + outputStr;
    } else outputStr = '%' + outputStr + '%'; 
    return outputStr;
}

function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
    }
    return hashParams;
}

function getQueryParams() {
    let result = ''
    let hashed = queryString.parse(window.location.hash)
    debugger
    if (hashed) {
        debugger;
        result = hashed.userId;
        debugger;
        return result
    } else return result;
}



export { getHashParams, getRandomStrForTrackSearch, getQueryParams } 

