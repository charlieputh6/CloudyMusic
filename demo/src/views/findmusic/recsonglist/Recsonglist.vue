<template>
  <div id="recong-list">
    <!--歌单介绍信息-->
    <div class="top-song-list">
      <div class="image">
        <img :src="imgUrl" alt="歌单封面">
      </div>
      <div class="info">
        <div class="hd">
          <el-divider content-position="left"><h2>精品歌单</h2></el-divider>
        </div>
        <div class="title">
          华语｜难以被复制的歌单推荐
        </div>
        <div class="desc">
          在时光中沉淀的首首经典老歌，承载了一段段印刻在内心最深处的回忆。重温经典，回味那些逝去的时光...
        </div>
      </div>
    </div>


    <!-- 歌单列表 -->
    <div class="song-list">
      <SongList :songlist="songlist"></SongList>
    </div>
  </div>
</template>

<script>
import SongList from "./SongList.vue";
export default {
    data() {
      return {
        imgUrl: require("../../../assets/img/wyy.png"), //顶部封面
        songlist:[],
        song:{}
      }
    },
    created(){
      this.getRecommendList();
    },
    methods:{
      async getRecommendList(){
        const { data: res } = await this.$http.get("/list/getrecommendlist");
        this.songlist = res.data
      }
    },
    components: { SongList }
}
</script>

<style lang="less" scoped>
.top-song-list{
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .image{
    width: 16%;
    background-color: var(--themeColor);
    img{
      width: 100%;
    }
  }
  .info{
    width: 80%;
    .title{
      font-size: 16px;
      padding-bottom: 5px;
    }
    .desc{
      height: 110px;
      font-size: 12px;
			color: #909399;
			overflow-y: scroll;
    }
  }
}
.song-list{
  margin-top: 20px;
  padding: 0 60px;
}
</style>
