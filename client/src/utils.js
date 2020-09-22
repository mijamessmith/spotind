
export function getRandomStrForTrackSearch() {
    const chars = '1234567890abcdefghijklmnopqrstuvwxyz'

    var charPosition = () => Math.floor(Math.random() * chars.length + 1)

    var wildCharPosition = Math.round(Math.random());
    var outputStr = ''

    for (let i = 0; i < 3; i++) {
        outputStr += chars[charPosition()];
    }
    if (wildCharPosition === 0) {
        outputStr = '%' + outputStr;
    } else outputStr = '%' + outputStr + '%'   
    return outputStr;
}