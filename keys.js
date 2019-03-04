require("dotenv").config();

console.log('this is loaded');

// console.log("ID: " + process.env.SPOTIFY_ID);
// console.log("SECRET: " + process.env.SPOTIFY_SECRET);

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// var Spotify = function(){
//   this.id = process.env.SPOTIFY_ID;
//   this.secret = process.env.SPOTIFY_SECRET;
// }

// module.exports = Spotify;