"use strict";
const api_request = require("./request.js");
const bannerApi = () => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/banner"
  });
};
const personalizedApi = () => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/personalized"
  });
};
<<<<<<< HEAD
const songListDetailApi = (id) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/playlist/detail",
    data: {
      id
    }
  });
};
exports.bannerApi = bannerApi;
exports.personalizedApi = personalizedApi;
exports.songListDetailApi = songListDetailApi;
=======
exports.bannerApi = bannerApi;
exports.personalizedApi = personalizedApi;
>>>>>>> 5d5e765f3a8a0b3b143167d83fe410119b417674
