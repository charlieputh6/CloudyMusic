<template>
  <div id="mylove">
    <!-- 歌单描述 -->
    <Topdesc></Topdesc>
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
      songs:[
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
  }
}
</script>

<style lang="less" scoped>
.song-list{
  padding-left: 60px;
}
</style>
