"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_share2 = common_vendor.resolveComponent("uni-popup-share");
  (_easycom_uni_tag2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2 + _easycom_uni_popup2 + _easycom_uni_popup_share2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_share = () => "../../uni_modules/uni-popup/components/uni-popup-share/uni-popup-share.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section + _easycom_uni_popup + _easycom_uni_popup_share)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "songsheet",
  setup(__props) {
    const share = common_vendor.ref(null);
    const songList = common_vendor.ref(null);
    common_vendor.ref([]);
    const hotComments = common_vendor.ref([]);
    const comments = common_vendor.ref([]);
    const popup = common_vendor.ref(null);
    common_vendor.onLoad(async (options) => {
      getSongList(options == null ? void 0 : options.id);
      getCommenSongList(options == null ? void 0 : options.id);
    });
    const getSongList = async (id) => {
      const res = await api_index.songListDetailApi(id);
      songList.value = res.data.playlist;
    };
    const getCommenSongList = async (id) => {
      const res = await api_index.commentSongListDetailApi(id);
      comments.value = res.data.comments;
      hotComments.value = res.data.hotComments;
    };
    const open = () => {
      popup.value.open("bottom");
    };
    const shareToggle = () => {
      share.value.open();
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      return {
        a: (_a = songList.value) == null ? void 0 : _a.coverImgUrl,
        b: common_vendor.t((_b = songList.value) == null ? void 0 : _b.name),
        c: (_c = songList.value) == null ? void 0 : _c.creator.avatarUrl,
        d: common_vendor.t((_d = songList.value) == null ? void 0 : _d.creator.nickname),
        e: common_vendor.t((_e = songList.value) == null ? void 0 : _e.description),
        f: common_vendor.p({
          circle: true,
          text: (_f = songList.value) == null ? void 0 : _f.shareCount,
          type: "primary"
        }),
        g: common_vendor.o(shareToggle),
        h: common_vendor.p({
          circle: true,
          text: (_g = songList.value) == null ? void 0 : _g.commentCount,
          type: "primary"
        }),
        i: common_vendor.o(open),
        j: common_vendor.p({
          circle: true,
          text: (_h = songList.value) == null ? void 0 : _h.subscribedCount,
          type: "primary"
        }),
        k: (_i = songList.value) == null ? void 0 : _i.coverImgUrl,
        l: common_vendor.f((_j = songList.value) == null ? void 0 : _j.tracks, (item, index, i0) => {
          return {
            a: item.id,
            b: "9a985123-5-" + i0 + ",9a985123-4"
          };
        }),
        m: common_vendor.p({
          title: "item.name",
          note: "item.ar.map(v => v.name).join('/')",
          showArrow: true,
          ["thumb-size"]: "sm",
          rightText: ""
        }),
        n: common_vendor.p({
          title: "播放全部",
          type: "line"
        }),
        o: common_vendor.f(hotComments.value, (item, k0, i0) => {
          return {
            a: item.commentId,
            b: "9a985123-9-" + i0 + ",9a985123-8",
            c: common_vendor.p({
              title: item.user.nickname,
              note: item.content,
              thumb: item.user.avatarUrl
            })
          };
        }),
        p: common_vendor.p({
          title: "热门评论",
          type: "line"
        }),
        q: common_vendor.f(comments.value, (item, k0, i0) => {
          return {
            a: item.commentId,
            b: "9a985123-12-" + i0 + ",9a985123-11",
            c: common_vendor.p({
              title: item.user.nickname,
              note: item.content,
              thumb: item.user.avatarUrl
            })
          };
        }),
        r: common_vendor.p({
          title: "最新评论",
          type: "line"
        }),
        s: common_vendor.sr(popup, "9a985123-6", {
          "k": "popup"
        }),
        t: common_vendor.p({
          ["border-radius"]: "10px 10px 0 0"
        }),
        v: common_vendor.sr(share, "9a985123-13", {
          "k": "share"
        }),
        w: common_vendor.p({
          type: "share",
          safeArea: true,
          backgroundColor: "#fff"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9a985123"]]);
wx.createPage(MiniProgramPage);
