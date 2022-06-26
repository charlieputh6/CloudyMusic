<template>
  <div class="rank-feature">
    <div class="hd">
      <el-divider><h2>官方榜</h2></el-divider>
    </div>
    <div v-for="(item,index) in rankfeature" :key="index"></div>
  </div>
</template>

<script>
export default {
  props:{
    rankfeature:{
      type:Array,
      default(){
        return [];
      },
    }
  },
  data(){
    return {

    }
  },
  methods:{
    rankClick(id) {
			//点击后根据歌单id 跳转歌单详情页
			this.$router.push("/songlistdetail/" + id);
		},
  }

}
</script>

<style lang="less" scoped>

</style>
