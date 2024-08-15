"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  _easycom_uni_tag2();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
if (!Math) {
  _easycom_uni_tag();
}
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
      var _a, _b, _c, _d, _e;
      return {
        a: (_a = songList.value) == null ? void 0 : _a.coverImgUrl,
        b: common_vendor.t((_b = songList.value) == null ? void 0 : _b.name),
        c: (_c = songList.value) == null ? void 0 : _c.creator.avatarUrl,
        d: common_vendor.t((_d = songList.value) == null ? void 0 : _d.creator.nickname),
        e: common_vendor.t((_e = songList.value) == null ? void 0 : _e.description),
        f: common_vendor.p({
          circle: true,
          text: "转发",
          type: "primary"
        }),
        g: common_vendor.p({
          circle: true,
          text: "评论",
          type: "primary"
        }),
        h: common_vendor.p({
          circle: true,
          text: "留言",
          type: "primary"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9a985123"]]);
wx.createPage(MiniProgramPage);
