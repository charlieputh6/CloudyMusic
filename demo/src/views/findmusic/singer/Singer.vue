<template>
  <div id="singer">
    <!-- 歌手列表 -->
    <div class="singerlist">
      <SingerList :singerlist="singerlist"></SingerList>
    </div>
    <!-- 分页器 -->
  </div>
</template>

<script>
import SingerList from "./SingerList"
export default {
    components: { SingerList },
    data(){
      return {
        singerlist:[{}],
      }
    }
}
</script>

<style lang="less" scoped>
.singer{
  padding-top: 20px;
}
</style>
