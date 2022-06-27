<template>
  <div class="playing-song-detail" ref="playingSongDetail">
    <!-- 关闭按钮 -->
		<span @click="closeSongDetail" class="close">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiangxiajiantou"></use>
      </svg>
    </span>
    <div class="main-content">
      <div class="top-lyrics">
         <!-- 左边旋转唱片 -->
        <div class="left-cover">
          <!-- 唱片旋转 -->
            <!-- <div class="record record-rotate" :class="{ startRotate: isPlaying }" @click="isPlaying ? pausePlay() : startPlay()">
              <img class="cp2" src="../../assets/img/cp2.png" alt="" />
              <img class="cover" :src="cover" alt="" />
            </div> -->
            <div class="record">
              <img class="cp2" src="../../assets/img/cp2.png" alt="" />
              <img class="cover" :src="cover" alt="" />
            </div>

        </div>
        <!-- 右边歌词 -->
        <div class="right-lyrics">
          <div class="hd">
            <h2>{{nowSongDetail.name}}</h2>
            <div>专辑：<span>{{nowSongDetail.album_id}}</span></div>
            <div>歌手：<span>{{nowSongDetail.singer_id}}</span></div>
          </div>
          <div class="bd" id="scrollLyric"  ref="scrollLyric">
            <ul v-if="formatlyric.length !==0">
              <li v-for="(item, index) in formatlyric"
              :key="index"
              :class="{currentLyric: currentRow == index}"

              >
                <!-- <span v-show="currentRow == index" class="arow">
                  <svg class="icon" aria-hidden="true">
                     <use xlink:href="#icon-a-youjiantouzhixiangyoujiantou"></use>
                  </svg>
                </span> -->

                <span class="lyric-item">{{ item.text }}</span>
                <!-- <span class="time">{{item.time}}</span> -->

              </li>
            </ul>
            <!-- 没有歌词时 -->
						<div v-else style="padding-top: 120px">
							<h2>暂无歌词，请您欣赏</h2>
						</div>
          </div>
        </div>
      </div>
      <div class="comment">
        <!-- 输入框 -->
        <div class="textinput">
          <el-input ref="commentContent" type="textarea" rows="3" maxlength="100" show-word-limit  placeholder="说点什么呗"> </el-input>
          <el-button round type="primary" size="small" icon="el-icon-position" class="el-btn" >发送评论</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed:{
    ...mapGetters(["isPlaying", "nowSongDetail", "isShowSongDetail",]),
    cover() {
			return this.nowSongDetail.cover;
		}
  },
  data(){
    return {
      formatlyric:[], //格式化后的歌词
      currentRow:0,  //当前行
    }
  },
  created(){
    this.toformatlyric();
  },
  mounted(){
    // console.log(this.formatlyric);
    //监听播放时间
    let musicDom = document.querySelector('#audio');//获取Audio的DOM节点
    //使用事件监听方式捕捉事件  这里只能写箭头函数  因为作用域的问题
    musicDom.addEventListener("timeupdate",()=>{
        let timeDisplay;
        //用秒数来显示当前播放进度
        timeDisplay = musicDom.currentTime;//获取实时时间  要去的位置
        // console.log(timeDisplay);
        // console.log(this.formatlyric);
        this.formatlyric.forEach((item, index)=>{
          if(Math.abs(timeDisplay - item.time) < 0.1 ){
            console.log(item.text+"\n");
            this.$refs.scrollLyric.scrollTop += (index-this.currentRow) * 45 ;
            console.log("滚动"+(index-this.currentRow) * 45);
            this.currentRow = index;
          }
        })
    },false);
  },
  methods:{
    // 点击唱片暂停
    pausePlay() {
			this.$store.dispatch("changePlayState", false);
			document.querySelector("#audio").pause();
		},
    // 点击唱片开始
		startPlay() {
			this.$store.dispatch("changePlayState", true);
			document.querySelector("#audio").play();
		},
    // 格式化歌词 转换成对象数组
    toformatlyric(){
      this.formatlyric = [];
      // 根据换行符分割成一行一行句一句歌词
      let lyric_arr = this.nowSongDetail.text.split("\n");
      for(let i = 0; i < lyric_arr.length; i++){
        // 每一行歌词
        let lyric_row = lyric_arr[i];
        // 根据“】” 分割时间和歌词
        let lyric_row_arr = lyric_row.split("]");
        // 通过pop得到每行歌词的文本内容
        let lyric_row_text = lyric_row_arr.pop();
        // 处理每行歌词的时间
        lyric_row_arr.forEach((item,index)=>{
          let lyric_row_obj = {};
          // 通过substr去掉“【”
          let time_arr = item.substr(1,item.length-1).split(":");
          // 计算时间 换成秒
          let row_second = time_arr[0] * 60 + Math.ceil(time_arr[1]);
          lyric_row_obj.time = row_second;
          lyric_row_obj.text = lyric_row_text;
          this.formatlyric.push(lyric_row_obj);
        })
      }
      // 因为是push  最后根据时间再来排序(升序)
      this.formatlyric.sort((a, b)=>{
        return a.time - b.time
      })
      // console.log(this.formatlyric);
    },
    // 关闭歌曲详情页
    closeSongDetail(){
      this.$store.commit("showSongDetail")
    }
  },
  watch:{
    // 监听当前歌曲变化
		nowSongDetail() {
      // 歌曲改变后从新获取歌词
      this.toformatlyric();
		},
    // 打开详情页要跟随变化
    isShowSongDetail() {
			if (this.isShowSongDetail) {
				this.$refs.scrollLyric.scrollTop = 45 * this.currentRow;
			}
		},

  }

}
</script>

<style lang="less" scoped>
.playing-song-detail{
  .close{
    padding-left: 20px;
    padding-top: 10px;
    font-size: 50px;
    cursor: pointer;
  }
  position: absolute;
  bottom: 70px;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: #eee;
  z-index: 999;
  overflow-y: scroll;
  .main-content{
    position: relative;
    width: 1350px;
    height: 100%;
    margin: 0 auto;
    .top-lyrics{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70%;
      height: 500px;
      margin: 0 auto;
      // 左边封面
      .left-cover{
        margin-right: 30px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 30%;
        .record {
					position: relative;
					width: 100%;
					.cp2 {
						width: 100%;
					}
					.cover {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						z-index: -1;
						width: 70%;
						border-radius: 50%;
					}
				}
      }
      // 右边歌词
      .right-lyrics{
        width: 55%;
        .hd{
          text-align: center;
          div{
            padding-top: 10px;
            span{
              cursor: pointer;
              color : var(--themeColor);
            }
          }
        }
        .bd{
          margin-top: 20px;
          height: 315px;
          text-align: center;
          overflow-y: auto;
          ul{
            padding: 20px 0;

            li{
              display: flex;
              height: 45px;
              transition: all 0.3s ease-in;
              &:hover{
                cursor: pointer;
                color: var(--themeColor);
              }
              .arow{
                padding: 0;
              }
              .lyric-item{
                flex: 1;
              }
              .time{
                display: inline-block;
								width: 45px;
								height: 45px;
              }
            }
            .currentLyric {
							font-size: 18px;
							font-weight: 700;
              color: var(--themeColor);
						}

          }
        }
      }
    }
    .comment{
      margin: 15px auto;
			width: 70%;
      .textinput {
      text-align: right;
      .el-btn {
        margin-top: 10px;
      }
}
    }
  }
}
// 唱片旋转
.record-rotate {
	animation-name: recordRotate;
	animation-duration: 20s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	animation-play-state: paused;
}
.startRotate {
	animation-play-state: running;
}
@keyframes recordRotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>
