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
const songListDetailApi = (id) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/playlist/detail",
    data: {
      id
    }
  });
};
const commentSongListDetailApi = (id) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/comment/playlist",
    data: {
      id
    }
  });
};
exports.bannerApi = bannerApi;
exports.commentSongListDetailApi = commentSongListDetailApi;
exports.personalizedApi = personalizedApi;
exports.songListDetailApi = songListDetailApi;
