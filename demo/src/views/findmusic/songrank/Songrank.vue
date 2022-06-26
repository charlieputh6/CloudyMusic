<template>
  <div id="song-rank">
    <Rankfeature :rankfeature="rankfeature"></Rankfeature>
  </div>
</template>

<script>
import Rankfeature from "./Childcomps/Rankfeature";
export default {
  components:{Rankfeature},
  data(){
    return{
      rankfeature:[],
    }
  },
  created(){
    // 请求榜单数据

  }
}
</script>

<style lang="less" scoped>

</style>
