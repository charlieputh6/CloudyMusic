<template>
<div id="footer">
  <div class="player">
<!-- 左侧歌曲封面 -->
    <div class="left-cover-content">
      <div class="cover-content">
        <!-- 封面 -->
        <div class="cover" @click="showSongDetail" @mouseenter="showMask = true" @mouseleave="showMask = false">
          <img :src="cover" alt="" :class="{ blur: showMask }" />
        </div>
        <div class="songname">
          <p style="padding-bottom: 5px">{{nowSongDetail.name}}</p>
          <p class="by">charlie</p>
        </div>
      </div>
    </div>
<!-- 中间播放控制 -->
    <div class="center-play-song">
      <!-- 播放控制按钮 -->
      <div class="change-play">
        <!-- 上一曲 -->
        <span class="change-box" @click="toggleSong(0)">
          <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyiqu"></use>
          </svg>
        </span>
        <!-- 播放 暂停 -->
        <span class="play-box" v-if="!isPlaying"  @click="playMusic">
          <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
          </svg>
        </span>
        <span class="play-box" v-else @click="pauseMusic">
          <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-pause"></use>
          </svg>
        </span>
        <!-- 下一曲 -->
        <span class="change-box" @click="toggleSong(1)">
            <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayiqu"></use>
          </svg>
        </span>
      </div>
    <!-- 歌曲进度条 -->
      <div class="song-progress">
        <!-- 当前歌曲进度 -->
          <div class="s-progress">
            <audio
            autoplay
            :controls="true"
            :src="nowSongDetail.src"
            ref="audioplay"
            :disabled="this.playingList.length == 0"
            @ended="playModel == 3 ? loopPlay() : toggleSong(1)"
            @play="changeState(true)"
            @pause="changeState(false)"
            id="audio"
            >你的浏览器版本太低，暂不支持</audio>
            <div class="coverIt"></div>
          </div>
      </div>
      <!-- 切换播放模式 -->
      <div class="playmodel">

        <el-tooltip effect="dark" content="顺序播放" placement="top" v-if="playModel == 1">
        <span v-if="playModel == 1" @click="changePlayModel(2)"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-order-play-fill"></use></svg></span>
					</el-tooltip>
					<el-tooltip effect="dark" content="随机播放" placement="top" v-if="playModel == 2">
						<span v-if="playModel == 2" @click="changePlayModel(3)"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-suijibofang"></use></svg></span>
					</el-tooltip>
					<el-tooltip effect="dark" content="单曲循环" placement="top" v-if="playModel == 3">
						<span v-if="playModel == 3" @click="changePlayModel(1)"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-danquxunhuan"></use></svg></span>
					</el-tooltip>

        <span>
          <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-cibiaoquanyi"></use>
          </svg>
        </span>

      </div>
    </div>
<!-- 右侧的声音控制 -->
    <div class="right-voice">
      <!-- 静音按钮 -->
      <span>
      <svg class="icon" aria-hidden="true" v-if="voiceValue != 0" @click="muteVolume">
      <use xlink:href="#icon-laba"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else  @click="cancelMute">
      <use xlink:href="#icon-shengyinguanbi"></use>
      </svg>
      </span>
      <!-- 声音进度条 -->
      <div class="block">
      <el-slider v-model="voiceValue" @input="changeVoiceProgress"></el-slider>
      </div>
      <!-- 播放列表按钮 -->
      <el-tooltip effect="dark" content="播放列表" placement="top">
        <span  @click="isShowDrawer = !isShowDrawer"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-bofangliebiao"></use></svg></span>
      </el-tooltip>

    </div>

    <!-- 当前播放列表 -->
    <transition name="playlist">
      <PlayingList v-if="isShowDrawer" @closePlayList="isShowDrawer = false" @toPlaySong="toPlaySong"/>
    </transition>
  </div>

</div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayingList from '../components/play/PlayingList.vue';
export default {
   computed:{
    ...mapGetters([
      "isLogin",
      // "userInfo",
      "songUrl",
      "isPlaying",
      "playingList",
      "nowSongDetail",
    ]),
    cover() {
			return this.nowSongDetail.cover;
		},
  },
  data() {
      return {
          // isplay: true,
          playModel: 1,
          nowIndex: 0,
          isShowDrawer: false,
          // cover:require("../assets/img/photo.jpg"),     //歌曲封面
          showMask:false, //是否封面遮罩
          songDetail: {
              id: 0,
              name: "",
              singer_id: 0,
              cover: "",
              src: "",
              play_time: 0
          },
          playingLists: [
              {
                  id: 436514312,
                  name: "成都",
                  singer_id: 6731,
                  album_id:6666,
                  cover: "http://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
                  src: "http://music.163.com/song/media/outer/url?id=436514312.mp3",
                  play_time: 329,
                  text:"[00:00.000] 作词 : 赵雷\n"+
                        "[00:01.000] 作曲 : 赵雷\n"+
                        "[00:02.000] 编曲 : 赵雷/喜子\n"+
                        "[00:03.000] 制作人 : 赵雷/喜子/姜北生\n"+
                        "[00:05.409]\n"+
                        "[00:18.744]让我掉下眼泪的\n"+
                        "[00:22.138]不止昨夜的酒\n"+
                        "[00:26.187]让我依依不舍的\n"+
                        "[00:30.218]不止你的温柔\n"+
                        "[00:34.185]余路还要走多久\n"+
                        "[00:38.218]你攥着我的手\n"+
                        "[00:42.176]让我感到为难的\n"+
                        "[00:45.984]是挣扎的自由\n"+
                        "[00:52.186]分别总是在九月\n"+
                        "[00:55.935]回忆是思念的愁\n"+
                        "[00:59.878]深秋嫩绿的垂柳\n"+
                        "[01:03.802]亲吻着我额头\n"+
                        "[01:07.696]在那座阴雨的小城里\n"+
                        "[01:11.835]我从未忘记你\n"+
                        "[01:15.877]成都 带不走的 只有你\n"+
                        "[01:23.740]和我在成都的街头走一走\n"+
                        "[01:31.721]直到所有的灯都熄灭了也不停留\n"+
                        "[01:39.451]你会挽着我的衣袖\n"+
                        "[01:43.392]我会把手揣进裤兜\n"+
                        "[01:47.297]走到玉林路的尽头\n"+
                        "[01:51.364]坐在小酒馆的门口\n"+
                        "[02:31.189]分别总是在九月\n"+
                        "[02:34.726]回忆是思念的愁\n"+
                        "[02:38.523]深秋嫩绿的垂柳\n"+
                        "[02:42.552]亲吻着我额头\n"+
                        "[02:46.530]在那座阴雨的小城里\n"+
                        "[02:50.650]我从未忘记你\n"+
                        "[02:54.459]成都 带不走的 只有你\n"+
                        "[03:02.260]和我在成都的街头走一走\n"+
                        "[03:10.433]直到所有的灯都熄灭了也不停留\n"+
                        "[03:18.294]你会挽着我的衣袖\n"+
                        "[03:22.022]我会把手揣进裤兜\n"+
                        "[03:26.142]走到玉林路的尽头\n"+
                        "[03:30.164]坐在小酒馆的门口\n"+
                        "[03:38.409]和我在成都的街头走一走\n"+
                        "[03:46.065]直到所有的灯都熄灭了也不停留\n"+
                        "[03:54.019]和我在成都的街头走一走\n"+
                        "[04:01.809]直到所有的灯都熄灭了也不停留\n"+
                        "[04:09.659]你会挽着我的衣袖\n"+
                        "[04:13.564]我会把手揣进裤兜\n"+
                        "[04:17.530]走到玉林路的尽头\n"+
                        "[04:21.581]走过小酒馆的门口\n"+
                        "[04:36.177]和我在成都的街头走一走\n"+
                        "[04:43.454]直到所有的灯都熄灭了也不停留\n"+
                        "[04:53.227]\n"+
                        "[04:57.130] 贝斯 : 张岭\n"+
                        "[05:01.033] 鼓 : 贝贝\n"+
                        "[05:04.936] 钢琴 : 柳森\n"+
                        "[05:08.839] 箱琴 : 赵雷/喜子\n"+
                        "[05:12.742] 笛子 : 祝子\n"+
                        "[05:16.645] 弦乐编写 : 柳森\n"+
                        "[05:20.548] 弦乐 : 亚洲爱乐国际乐团\n"+
                        "[05:24.451] 和声 : 朱奇迹/赵雷/旭东\n"+
                        "[05:28.354] 童声 : 朵朵/天天\n"

              },
              {
                  id: 437608773,
                  name: "无法长大",
                  singer_id: 6731,
                  album_id:6666,
                  cover: "http://p1.music.126.net/zy9EZ2dcsofYlVAn-nb-wA==/3412884129074161.jpg",
                  src: "http://music.163.com/song/media/outer/url?id=437608773.mp3",
                  play_time: 288,
                  text:"[00:00.000] 作词 : 赵雷\n"+
                        "[00:01.000] 作曲 : 赵雷\n"+
                        "[00:08.68]编曲 : 赵雷/喜子\n"+
                        "[00:12.73]\n"+
                        "[00:17.24]我知道 我做的不对\n"+
                        "[00:21.14]我总是喜欢说说\n"+
                        "[00:25.13]对不起 我欠你太多的怀抱\n"+
                        "[00:33.42]总是觉得工作太忙\n"+
                        "[00:37.28]常常被冷眼灼伤\n"+
                        "[00:41.38]对不起 总是让你受委屈\n"+
                        "[00:49.59]人和人总是有差距\n"+
                        "[00:57.73]日子里总要遇难题\n"+
                        "[01:05.97]总是盼望太多 最后如不如意都被时间浇熄\n"+
                        "[01:13.14]哦 Baby 你说你不是很在意\n"+
                        "[01:22.28]多想和你游遍世界\n"+
                        "[01:25.29]那样活着才有意义\n"+
                        "[01:30.28]我知道你和我都不喜欢逃避\n"+
                        "[01:38.50]时光拿走了你的美丽\n"+
                        "[01:42.46]岁月带走了我的脾气\n"+
                        "[01:46.41]对不起 我还欠你一场婚礼\n"+
                        "[01:54.79]说着说着 我又开始不切实际\n"+
                        "[02:02.93]说着说着 我就醉在了你的怀里\n"+
                        "[02:11.07]三十岁的眼泪还流有青春余味\n"+
                        "[02:19.06]爱情是否能解除生活的狼狈\n"+
                        "[02:27.28]别要求太多 学着时间一样洒脱\n"+
                        "[02:34.49]哦 Baby 我性格不是这样的\n"+
                        "[02:43.61]婚姻会不会让我们感到乏味\n"+
                        "[02:51.69]那么就这样 不去理睬这浮躁的社会\n"+
                        "[02:59.87]既然无法长大 那就不要学着别人去挣扎\n"+
                        "[03:06.82]哦 Baby 但愿我们能相随\n"+
                        "[03:16.12]既然无法长大 那就不要学着别人去挣扎\n"+
                        "[03:23.13]哦 Baby 但愿我们能相随\n"+
                        "[04:17.32]我知道我做的不对\n"+
                        "[04:21.46]我只是有些疲惫\n"+
                        "[04:25.41]哦 Baby 别留我一个人睡\n"+
""
              },
              {
                  id: 447926063,
                  name: "朵",
                  singer_id: 6731,
                  album_id:6666,
                  cover: "http://p1.music.126.net/BJgUd9aD9gpougZFASRTTw==/18548761162235571.jpg ",
                  src: "http://music.163.com/song/media/outer/url?id=447926063.mp3",
                  play_time: 329
              }
          ],
          voiceValue: 50,
          nowVolume: 50,
      };
  },
  created() {

  },
  mounted() {
      this.updateSongs();
      // 死数据先在这里将播放列表全部加入playingList里面
      this.$store.dispatch("addAllSong", this.playingLists);
      // 保存歌曲URL
      this.$store.dispatch("saveSongUrl",this.nowSongDetail.src)
      // 保存当前正在播放歌曲的详细信息
      this.$store.dispatch("saveSongDetail",this.nowSongDetail);
      this.pauseMusic();
  },
  methods: {
    // 是否展示歌曲详情页
    showSongDetail(){
      this.$store.commit("showSongDetail")
    },
    // 更新歌曲
    updateSongs() {
      this.$store.dispatch("saveSongDetail",this.playingLists[this.nowIndex]);
    },
    // 切歌
    toggleSong(type) {
        // 判断播放列表不为空和只有一首歌时
        if (this.playingList.length == 0) {
            this.$message({
                showClose: true,
                message: "播放列表为空",
                type: "warning",
            });
        }
        else if (this.playingList.length == 1) {
            this.$message({
                showClose: true,
                message: "播放列表当前只有一个歌",
                type: "warning",
            });
            this.playMusic();
        }
        else {
            // 再根据所处播放模式进行切歌  1顺序，2是随机，3是单曲循环
            if (this.playModel === 1) {
                // 顺序播放 type =0是上一首，1是下一首
                this.orderPlay(type);
            }
            else if (this.playModel === 2) {
                // 随机播放
                this.randomPlay();
            }
            else if (this.playModel === 3) {
                this.loopPlay();
            }
            console.log(this.nowIndex);
        }
    },
    // 播放
    playMusic() {
        if (this.playingList.length == 0) {
            this.$message({
                showClose: true,
                message: "播放列表为空",
                type: "warning",
            });
        }
        else {
            this.$refs.audioplay.play();
        }
    },
    // 播放或者暂停 就到vuex改变当前播放状态
    changeState(isPlay) {
      this.$store.dispatch("changePlayState", isPlay);
    },
    // 顺序模式
    orderPlay(type) {
        let toggleIndex;
        // 根据当前歌曲索引来判断要切换的歌曲索引
        switch (this.nowIndex) {
            // 0是上一首
            case 0:
                toggleIndex = type === 0 ? this.playingList.length - 1 : this.nowIndex + 1;
                break;
            case this.playingList.length - 1:
                toggleIndex = type === 0 ? this.nowIndex - 1 : 0;
                break;
            default:
                toggleIndex = type === 0 ? this.nowIndex - 1 : this.nowIndex + 1;
                break;
        }
        this.$store.dispatch("saveSongDetail",this.playingList[toggleIndex]);
        this.nowIndex = toggleIndex;
    },
    // 循环播放
    loopPlay() {
        // 把音频标签的loop设为true
        this.$refs.audioplay.loop = true;
        // 重新载入
        this.$refs.audioplay.load();
        this.$refs.audioplay.play();
    },
    // 随机播放
    randomPlay() {
        // 获取一个随机索引号
        let radomIndex = Math.floor(Math.random() * (this.playingList.length - 1 - 0 + 1));
        // 根据索引号拿到随机歌曲
        this.$store.dispatch("saveSongDetail",this.playingList[radomIndex]);
        this.nowIndex = radomIndex;
    },
    // 切换播放模式
    changePlayModel(model) {
        // 先关闭循环模式
        this.$refs.audioplay.loop = false;
        this.playModel = model;
    },
    // 暂停
    pauseMusic() {
        this.$refs.audioplay.pause();
    },
    // 拖动音量进度条
    changeVoiceProgress(len) {
        // this.voiceProgress = len;
        // console.log(len/100);
        this.$refs.audioplay.volume = len / 100; //修改音量
    },
    // 静音
    muteVolume() {
        this.nowVolume = this.voiceValue; //保存当前音量，用于取消静音时恢复
        this.voiceValue = 0; //音量设置为0
        this.$refs.audioplay.volume = 0;
    },
    // 取消静音
    cancelMute() {
        this.voiceValue = this.nowVolume;
        this.$refs.audioplay.volume = this.voiceValue / 100;
    },
    // playingList组件传过来的双击事件
    toPlaySong(){
      this.$refs.audioplay.play();
    },
  },
  components: { PlayingList },

}
</script>

<style lang="less" scoped>
#footer {
	width: 100%;
	position: fixed;
	bottom: 0px;
	height: 70px;
	z-index: 999;
	background: #f8f8ff;
	border-top: 1px solid #dddddd;
}
.player {
	display: flex;
	align-items: center;
	height: 100%;
	width: 98%;
	margin: 0 auto;
  .left-cover-content{
    height: 100%;
    display: flex;
    width: 15%;
    background-color: skyblue;
    .cover-content{
      display: flex;
      align-items: center;
      .cover{
        width: 70px;
        height: 70px;;
        cursor: pointer;
         display: flex;
        font-size: 34px;
        color: var(--themeColor);
        .blur {
				  filter: blur(3px) brightness(80%);
			  }
      }
      .songname {
				margin-left: 35px;
				p {
					width: 100px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
        .by{
          color: grey;
        }
			}
    }

  }
  .center-play-song{
    display: flex;
    flex: 1;
    background-color: pink;
    margin-left: 40px;
    height: 100%;
    .change-play{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15%;
      .change-box,
      .play-box{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background-color: var(--themeColor);
        border-radius: 50%;

      }
      .change-box{
        width: 30px;
        height: 30px;
        margin: 0 10px;
        font-size: 18px;
      }
      .play-box{
        width: 42px;
        height: 42px;
        font-size: 35px;
      }

    }

    .song-progress{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      span{
        padding: 0 10px;
      }
      .s-progress{
        width: 100%;
        audio{
          width: 100%;
          // position: relative;
        }
        .coverIt{
          position:absolute;
          width: 50px;
          height: 50px;
          background-color: #f1f3f4;
          right: 398px;
          top: 9px;
        }
      }
    }
    .playmodel{
      display: flex;
      width: 8%;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: #000;
      span{
        margin: 0 5px;
      }
    }

  }
  .right-voice{
    height: 100%;
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: yellow;
    font-size: 25px;
    span{
      margin: 0 10px;
    }
    .block{
      width: 80%;
      }

  }

}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

}

audio::-webkit-media-controls-volume-slider,
audio::-webkit-media-controls-toggle-closed-captions-button,
audio::-webkit-media-controls-mute-button,
audio::-webkit-media-controls-play-button {
        display: none;
    }
// 播放列表动画  歌曲列表的是否展示的过度动画
.playlist-enter,
.playlist-leave-to {
	transform: translateX(100%);
}
.playlist-enter-active,
.playlist-leave-active {
	transition: all 0.6s;
}
.playlist-enter-to {
	transform: translateX(0);
}

</style>
