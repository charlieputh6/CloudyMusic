<template>
  <!-- 顶部导航 -->
  <div class="top-nav">
    <el-menu :default-active="$route.path" router mode="horizontal" >
      <el-menu-item v-for="(item, index) in tabItem" :key="index" :index="item.path">{{item.name}}</el-menu-item>
</el-menu>
  </div>
</template>

<script>
export default {
  props:{
    tabItem:{
      type:Array,
      default(){
        return [];
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top-nav {
	display: flex;
	width: 100%;
	justify-content: center;
  margin-bottom: 10px;
}
.el-menu {
	border: 0;
}
.el-menu-item {
	color: #303133;
	height: 45px;
	line-height: 45px;
	font-size: 16px;
}
.el-menu--horizontal > .el-menu-item.is-active {
	border-bottom: 3px solid var(--themeColor);
	font-size: 18px;
	color: var(--themeColor);
}
</style>
