<template>
  <div id="main">
    <!-- main主体 -->
    <div class="view">
      <!-- <transition name="el-fade-in"> -->
        <!-- 对这几个页面刷新缓存 -->
        <keep-alive include="Findmusic,Recvideo,RecEveryDay,MyFavorite">
          <!-- 使用v-if="isRouterAlive" 有一个过渡动画的效果 这里也没用到-->
            <router-view v-if="isRouterAlive"></router-view>
        </keep-alive>
      <!-- </transition> -->
      <!-- 返回顶部按钮 -->
       <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
    </div>


  </div>

</template>

<script>
export default {
    data(){
      return {
        isRouterAlive:true,
      }
    },
    provide(){
      return {
		  	reload: this.reload,
		  }
    },
    methods:{
      // methods里面加入一个刷新的方法 最后，需要把这个函数 provide 出去
      // 这样，app.vue上就设置完了 那么当我们需要刷新的时候，在需要的页面上加上这个函数就可以了
      // 首先注入这个函数 然后在需要用到这个函数的地方去引用就行了
      reload() {
			  this.isRouterAlive = false;
		  	this.$nextTick(function () {
				this.isRouterAlive = true;
			});
		},
    }
}
</script>

<style lang="less" scoped>
#main{
  height: 100vh;
  width: 100%;
}

</style>
