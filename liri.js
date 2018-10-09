require("dotenv").config();
//~~~~~~~~~~
// Global Variables
var nodeArgs = process.argv;
var commandArg = process.argv[2];
var argsArray = [];

for (var i = 3; i < nodeArgs.length; i++) {
    argsArray.push(nodeArgs[i]);
};

var userInput = argsArray.join(' ');
//~~~~~~~~~~
// Spotify This Song
// Inpurt keys.js file and store it as a variable
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

function spotifyThisSong () {
    spotify.search ({ type: "track", limit: 1, query: userInput }, function(error, data) {
        if (error) {
            return console.log ("Errored: " + error);
        }
        var artistName = data.tracks.items[0].album.artists[0].name;
        var songTitle = data.tracks.items[0].name;
        var albumTitle = data.tracks.items[0].album.name;
        var songPreview = data.tracks.items[0].preview_url;

        console.log ("The artist is: " + artistName + " . ");
        console.log ("The song title is: " + songTitle + " . ")
        console.log ("The album is: " + albumTitle + " . ");
        console.log ("Click this link for a preview of this song: " + songPreview + " . ");

        var dataToAppend = 
            "sporify-this-song " + userInput + 
            "\nThe artist is: " + artistName + " . " +
            "\nThe song is: " + songTitle + " . " + 
            "\nThis song is on the " + albumTitle + " album. "
            "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n";

        fs.appendfile("log.txt", dataToAppend, function(error) {
            if (error) {
                console.log(error);
            }
            else {
                console.log ("Content Added!")
            }
        })
})
}
//~~~~~~~~~~
//

//~~~~~~~~~~
//Function Calls
spotifyThisSong ();