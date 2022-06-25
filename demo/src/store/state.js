const state = {


  // 用户喜欢的音乐id列表
  likeSongIds: localStorage.getItem("likeSongIds") ? JSON.parse(localStorage.getItem("likeSongIds")) : [],



  /*
  音乐播放
   */
  // 音乐播放状态
  isPlaying: false,
  // 当前下载音乐信息
  downloadMusicInfo: {},
  // 是否显示当前歌曲详情页
  isShowSongDetail: false,
  // 是否显示悬浮歌词
  showFloatLyric: false,
  // 当前播放歌曲歌词
  currentLyric: [],
  //当前歌曲url
  songUrl: " ",
  // 当前歌曲详情
  nowSongDetail: localStorage.getItem("nowSongDetail") ? JSON.parse(localStorage.getItem("nowSongDetail")) : {},
  //正在播放列表
  playingList: localStorage.getItem("playingList") ? JSON.parse(localStorage.getItem("playingList")) : [],
  // 历史播放列表
  historyPlay: localStorage.getItem("historyPlay") ? JSON.parse(localStorage.getItem("historyPlay")) : [],
};
export default state
