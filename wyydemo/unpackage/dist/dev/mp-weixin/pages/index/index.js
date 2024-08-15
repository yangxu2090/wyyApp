"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const pages_index_navball = require("./navball.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  (_component_uni_icons + _component_uni_section)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const banners = common_vendor.ref([]);
    const playlists = common_vendor.ref([]);
    api_index.bannerApi().then((res) => {
      banners.value = res.data.banners;
    });
    api_index.personalizedApi().then((res) => {
      playlists.value = res.data.result;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "list",
          size: "30"
        }),
        b: common_vendor.f(banners.value, (item, k0, i0) => {
          return {
            a: item.imageUrl,
            b: item.imageUrl
          };
        }),
        c: common_vendor.f(common_vendor.unref(pages_index_navball.ballList), (item, k0, i0) => {
          return {
            a: item.iconUrl,
            b: common_vendor.t(item.name),
            c: item.name
          };
        }),
        d: common_vendor.p({
          title: "推荐歌单",
          type: "line"
        }),
        e: common_vendor.f(playlists.value, (item, k0, i0) => {
          return {
            a: item.picUrl,
            b: common_vendor.t(item.name),
            c: item.name
          };
        }),
        f: common_vendor.p({
          title: "粤语 | 中文 | 欧美 | 热门榜单",
          type: "line"
        }),
        g: common_vendor.p({
          title: "你的雷达歌单",
          type: "line"
        }),
        h: common_vendor.f(playlists.value, (item, k0, i0) => {
          return {
            a: item.picUrl,
            b: common_vendor.t(item.name),
            c: item.name
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
