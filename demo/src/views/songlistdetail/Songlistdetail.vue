<template>
  <div id="song-list-detail">
    <!-- 歌单描述 -->
    <Topdesc :playlist="playlist" @playAllSong="playAllSong"></Topdesc>
    <!-- 底部歌单 -->
    <div class="song-list">
      <el-tabs>
        <!-- 歌曲列表 -->
        <el-tab-pane label="歌曲列表">
          <SongTable :songs="songs"></SongTable>
        </el-tab-pane>
        <!-- 歌单评论 -->
        <el-tab-pane label="评论">
          <span>暂无评论</span>
        </el-tab-pane>
        <el-tab-pane label="收藏者">
          <span>暂无收藏</span>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>



<script>
import Topdesc from './Childcomps/Topdesc.vue'
import SongTable from '../../components/content/SongTable.vue'
export default {
  components: { Topdesc, SongTable },
  data(){
    return{
      id: "", //存储路由传递过来歌单id
      // songs:[
      //   {
      //     id: 436514312,
      //     name: "成都",
      //     singer_id: 6731,
      //     cover: "http://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
      //     src: "http://music.163.com/song/media/outer/url?id=436514312.mp3",
      //     play_time: 329
      //   },
      //   {
      //     id: 437608773,
      //     name: "无法长大",
      //     singer_id: 6731,
      //     cover: "http://p1.music.126.net/zy9EZ2dcsofYlVAn-nb-wA==/3412884129074161.jpg",
      //     src: "http://music.163.com/song/media/outer/url?id=437608773.mp3",
      //     play_time: 288
      //   },
      //   {
      //     id: 447926063,
      //     name: "朵",
      //     singer_id: 6731,
      //     cover: "http://p1.music.126.net/BJgUd9aD9gpougZFASRTTw==/18548761162235571.jpg ",
      //     src: "http://music.163.com/song/media/outer/url?id=447926063.mp3",
      //     play_time: 329
      //   }
      // ],
      playlist: {}, //歌单描述信息
			songids: "", //歌单中所有歌曲id
			songs: [], //歌单中所有歌曲详细信息
      new_songs:[]
    }
  },
  created(){
    // 保存存储路由传递过来歌单id
    this.id = this.$route.params.id;
    // 根据歌单id请求对应的歌单详情数据
    this.getSongListDetailById();
  },
  methods:{
    // 根据歌单id请求对应的歌单详情数据
    async getSongListDetailById(){
      const { data: res } = await this.$http.get("/list/getlistinfo", {params: { listId:this.id} });
      // console.log(res);
      let res1 = res.data;
      // 存储顶部歌单信息
      this.playlist.name = res1.name;
      this.playlist.nickName = res1.nickName;
      this.playlist.portrait = res1.portrait;
      this.playlist.createTime = res1.createTime;
      this.playlist.musicCount = res1.musicCount;
      this.playlist.introduction = res1.introduction;
      this.playlist.time = res1.time;
      this.playlist.cover = res1.cover;
      // 存储歌单所有的歌单详细信息
      this.songs = res1.musicList;
    },
    // 播放全部歌曲事件
		async playAllSong() {
      console.log(this.songs);
			// this.$store.dispatch("addAllSong", this.songs);
			// 默认播放第一首歌
      for(let i=0;i<this.songs.length;i++){
        const { data: res } = await this.$http.get("/music/getmusic", {params: { musicId:this.songs[i].songId} });
        let song = res.data;
        this.new_songs.push(song);
      }
      this.$store.dispatch("addAllSong", this.new_songs);
      // 更新播放状态
      this.$store.dispatch("changePlayState", true);
			//提交vuex保存当前歌曲详情
			this.$store.dispatch("saveSongDetail", this.new_songs[0]);
      this.$store.dispatch("addPlayinglist",this.new_songs[0])
      // console.log(this.songs[0]);
		},
  }
}
</script>

<style lang="less" scoped>
.song-list{
  padding-left: 60px;
}
</style>
