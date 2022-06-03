<template>
<div id="footer">
  <div class="player">
<!-- 左侧歌曲封面 -->
    <div class="left-cover-content">
      <div class="cover-content">
        <!-- 封面 -->
        <div class="cover">
            <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle"></use>
          </svg>

        </div>
        <div class="songname">
          <p>歌曲名称</p>
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
    ])
  },
    data() {
        return {
            // isplay: true,
            playModel: 1,
            nowIndex: 0,
            isShowDrawer: false,
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
                    cover: "http://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
                    src: "http://music.163.com/song/media/outer/url?id=436514312.mp3",
                    play_time: 329
                },
                {
                    id: 437608773,
                    name: "无法长大",
                    singer_id: 6731,
                    cover: "http://p1.music.126.net/zy9EZ2dcsofYlVAn-nb-wA==/3412884129074161.jpg",
                    src: "http://music.163.com/song/media/outer/url?id=437608773.mp3",
                    play_time: 288
                },
                {
                    id: 447926063,
                    name: "朵",
                    singer_id: 6731,
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
        this.$store.dispatch("saveSongDetail",this.nowSongDetail)
    },
    methods: {
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
        cursor: pointer;
         display: flex;
        font-size: 34px;
        color: var(--themeColor);
      }
      .songname {
				margin-left: 35px;
				p {
					width: 100px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
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
