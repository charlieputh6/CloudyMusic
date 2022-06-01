<template>
  <div class="playing-list">
    <!-- 顶部导航 -->
    <div class="top-nav">
      <TabBar  :tabitems="tabitems" @tabItemClick="tabItemCLick"/>
    </div>
    <!-- 总的信息 共多少首 -->
    <div class="hd">
      <h4 style="padding:0 10px">总共{{}}首</h4>
    </div>
    <!-- 主体  歌曲列表 -->
    <div class="bd"></div>
  </div>
</template>

<script>
import TabBar from '../common/TabBar.vue';
export default {
    data() {
        return {
            tabitems: [{ name: "播放列表" }, { name: "历史记录" }],
            activeItem: 0,    //用于显示前面的还是后面的那个历史记录
        };
    },
    components: { TabBar },
    methods:{
      // 顶部tab点击切换
      tabItemCLick(index){
          this.activeItem = index;
      }
    }
}
</script>

<style lang="less" scoped>
.playing-list{
  position: absolute;
  bottom: 70px;
  right: 0;
  height: calc(100vh - 130px);
  width: 450px;
  background-color: #fff;
  border-left: 1px solid #ebebeb;
  box-shadow: -3px 0px 5px 0px #eee;
}
.top-nav{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 24px;
  margin-top: 10px;
}
</style>
