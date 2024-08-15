"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "songsheet",
  setup(__props) {
    const songList = common_vendor.ref(null);
    common_vendor.onLoad(async (options) => {
      const res = await api_index.songListDetailApi(options == null ? void 0 : options.id);
      console.log(res.data);
      songList.value = res.data.playlist;
    });
    return (_ctx, _cache) => {
      return {
        a: songList.value.coverImgUrl,
        b: common_vendor.t(songList.value.name)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9a985123"]]);
wx.createPage(MiniProgramPage);
