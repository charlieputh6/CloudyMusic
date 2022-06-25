<template>
<div class="recEveryDay">
  <!-- 登录后允许查看 -->
  <div v-if="true">
    <div class="hd">
      <div class="nowdata">
        <div class="left-date">
          <p>{{getNowDay}}</p>
          <div class="nowday">{{getNowDate}}</div>
        </div>
        <div class="right-text">
          <h2>每日歌曲推荐</h2>
          <div>根据你的音乐口味生成,每天6:00更新</div>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" icon="el-icon-video-play" @click="playAll">播放全部</el-button>
        <el-button icon="el-icon-folder-add">收藏全部</el-button>
      </div>
    </div>

    <div class="bd">
			<song-table :songs="recsongs"/>
		</div>
  </div>
  <div v-else>
    <el-empty description="登录后才能查看" :image-size="200"></el-empty>
  </div>
</div>
</template>

<script>
import SongTable from '../../components/content/SongTable.vue';
export default {
  data(){
    return{
      recsongs:[
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
      ]
    }
  },
  components: { SongTable },
  computed:{
    getNowDay(){
      var date = new Date();  // 创建日期对象
      var day = date.getDay(); //返回日期0-6 0是星期日
      var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]; // 通过数组获取文字
      return arr[day];
    },
    getNowDate(){
      var date = new Date();  // 创建日期对象
      var day = date.getDate(); //获取具体日期，返回的是几号
      return day;
    }
  },
  created(){
// 请求获取每日推荐
  },
  methods:{
    playAll(){
      // // 保存请求获取的每日推荐
      // this.$store.dispatch("addAllSong", this.song);
      // // 提交vuex保存当前歌曲详情
      // this.$store.dispatch("saveSongDetail",this.song)
    }
  }

}
</script>

<style lang="less" scoped>
.recEveryDay{
  margin-top: 25px;
  margin-left: 75px;
  .nowdata{
    display: flex;
    .left-date{
      width: 100px;
      height: 100px;
      border: 1px solid #ddd;
      text-align: center;
      p{
        font-size: 16px;
        padding: 3px 0;
      }
      .nowday{
        font-size: 50px;
        color:var(--themeColor)
      }
    }
    .right-text{
      padding-left: 20px;
      h2{
        padding-bottom: 20px;
      }
    }
  }
  .btn {
	margin: 20px 0;
  }
}

</style>
