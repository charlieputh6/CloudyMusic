<template>
  <div class="banner" v-if="banner.length!==0">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img :src="item.imgSrc" @click="playMusic(item)" />
      </el-carousel-item>
    </el-carousel></div>
</template>

<script>
export default {
  props:{
  banner:{
    type:Array,
    default(){
      return [];
    }
  },
  },
  data(){
    return {
      // 这个以后通过请求获取歌曲详情
      detail:{
        id: 436514312,
        name: "成都",
        singer_id: 6731,
        cover: "http://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
        src: "http://music.163.com/song/media/outer/url?id=436514312.mp3",
        play_time: 329
      }
    }
  },
  methods:{
    playMusic(url){
      // 提交vuex添加到播放列表(应该是提交到了播放列表，可能差播放事件吧 但好像也不是 总之没实现)
      this.$store.dispatch("addPlayinglist",this.detail);
    }
  }
}
</script>

<style lang="less" scoped>
// .banner {
// 	position: relative;
// 	img {
// 		width: 100%;
// 	}
// }

</style>
