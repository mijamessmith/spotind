/*-------------------------Import Modules-----------------------------------------*/

const express = require('express'); // Express web server framework
require('dotenv').config()
const session = require('express-session'); //must be above app
const request = require('request'); // "Request" library
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

/*---------------------------API Credentials to be later saved as .ENV ----------------*/
var client_id; // Your client id
var client_secret; // Your secret
var redirect_uri; // Or Your redirect uri



/*--------------------------Setup parsers------------------------------------------------*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'))
    .use(cookieParser());

/*-----------------------------------Setting up the Session------------------------------- */

app.use(session({
    genid: (req) => { //generate id
        console.log('Inside session middleware genid function')
        console.log('Request object sessionID from client: ' + req.sessionID);
        var new_sid = uuid.v4(); //method of uuid version 4
        console.log('New session id generated: ' + new_sid);
        return new_sid; // use UUIDs for session IDs
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))



/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';


app.get('/login', function(req, res) {

  var state = generateRandomString(16);
    res.cookie(stateKey, state);
  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
           

          //set up the tokens in the session
          req.session.access_token = access_token;
          req.session.refresh_token = refresh_token;
          
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };


        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
            console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            access_token: access_token,
              refresh_token: refresh_token,
          }));

      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get("/getCredentials", (req, res, next) => {
    if (req.session.access_token) {
        async function getCred() {
            await axios({
                method: "get",
                url: 'https://api.spotify.com/v1/me',
                responseType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + req.session.access_token
                }
            })
                .then(response => {
                    let resp = response.data.id;
                    req.session.currentUserId = resp
                    console.log(resp)
                    res.send(resp)
                })
                .catch((err) => {
                    console.log(err)
                })
        } getCred();
    } else console.log("Need an access token")

    //async function getCred() {
    //    await fetch("https://api.spotify.com/v1/me", {
    //        'Content-Type': 'application/json',
    //        method: "GET",
    //        headers: {
    //            'Authorization': 'Bearer ' + req.session.access_token
    //        }
    //    }).then(data => {
    //        console.log(data)
    //    })
    //} getCred();    
})



console.log('Listening on 8888');
app.listen(8888);
