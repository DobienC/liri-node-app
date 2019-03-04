require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
const dotenv = require('dotenv')

console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
