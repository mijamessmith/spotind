
/*User experience will go as follows
 * 
 * 1. Landing on screen with info and a button towards oAuth log in
 * 2. Upon successful log in, a user will be pointed to the main app page
 *    The page will automatically check if a user has a playlist that contains a certain
 *    phrase/wording. If it does, it will select that new playlist and store it in the state
 *    If not, it will create a new playlist and store it in the state
 * 3. The main app will contain a single drop down field containing genres. Given a genre, the 
 *    app will create a random word to be searched for in the track api. 
 *    After reveiving the data, another request to get info about the artist/bio/ect will go out
 *    Finally, using this data, which will be stored in state, the app will populate an embedded
 *    widget player and play the song.
 * 4. The user can then click on the left or right side of the box to indicate a "like" or a "dislike"
 *    If liked, a req will be sent out to add the track to the playlist stored in state
 *    If disliked, a new song will be searched for from the step above. 
 *    
 *    Research info
 *    We can identify songs through the URI (track: #) and use that to play in the embedded player. 
 *    Just the string of characters (minus the track parameter) is the spotify id.
 *    
 *    We can store both the token and the refresh token in the session. This is what passport is for. 
 *    
 *    

