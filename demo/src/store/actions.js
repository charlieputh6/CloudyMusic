const actions = {


  // 用户喜欢的音乐id列表
  saveLikeSongIds({ commit }, payload) {
    commit("saveLikeSongIds", payload);
  },

  /* 音乐播放 */
  //改变播放状态
  changePlayState({ commit }, payload) {
    commit("changePlayState", payload);
  },
  // 保存歌曲url
  saveSongUrl({ commit }, payload) {
    commit("saveSongUrl", payload);
  },
  // 保存当前播放歌曲详情
  saveSongDetail({ commit }, payload) {
    commit("saveSongDetail", payload);
  },
  //添加单曲到当前播放列表
  addPlayinglist({ commit }, payload) {
    commit("addPlayinglist", payload);
  },
  // 点击播放全部，添加当前歌单所有歌曲到播放列表
  addAllSong({ commit }, payload) {
    commit("addAllSong", payload);
  },
  // 删除播放列表单曲
  deleteSong({ commit }, payload) {
    commit("deleteSong", payload);
  },
  // 清空播放列表
  deleteAll({ commit }) {
    commit("deleteAll");
  },
  // 清空历史记录
  deleteAllHistory({ commit }) {
    commit("deleteAllHistory");
  },
  // 删除历史记录单曲
  deleteHistory({ commit }, payload) {
    commit("deleteHistory", payload);
  },

};
export default actions;
