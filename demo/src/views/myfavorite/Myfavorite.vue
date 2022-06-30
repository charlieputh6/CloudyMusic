<template>
  <div id="song-list-detail">
    <!-- 歌单描述 -->
    <Topdesc :playlist="playlist"></Topdesc>
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
import Topdesc from '../songlistdetail/Childcomps/Topdesc.vue'
import SongTable from '../../components/content/SongTable.vue'
export default {
  components: { Topdesc, SongTable },
  data(){
    return{
      id: "", //存储路由传递过来歌单id
      playlist: {}, //歌单描述信息
			songids: "", //歌单中所有歌曲id
			songs: [], //歌单中所有歌曲详细信息
    }
  },
  created(){

    // 根据歌单id请求对应的歌单详情数据
    this.getSongListDetailById();
  },
  methods:{
    // 根据歌单id请求对应的歌单详情数据
    async getSongListDetailById(){
      const { data: res } = await this.$http.get("/like-list/getlikelist");
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
    }
  }
}
</script>

<style lang="less" scoped>
.song-list{
  padding-left: 60px;
}
</style>
