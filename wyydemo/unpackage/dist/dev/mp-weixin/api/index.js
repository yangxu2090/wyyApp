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
exports.bannerApi = bannerApi;
exports.personalizedApi = personalizedApi;
