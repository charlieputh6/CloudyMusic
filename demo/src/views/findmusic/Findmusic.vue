<template>
<div id="find-music">
  <!-- 顶部导航 -->
  <TopNav :tabItem="topnav"/>
  <!-- 子内容 -->
  <div class="music-content">
    <transition name="el-fade-in-linear">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</div>
</template>

<script>
import TopNav from '../../components/common/TopNav.vue';
export default {
    components: { TopNav },
    data() {
		return {
			topnav: [
				{
					name: "个性推荐",
					path: "/findmusic/discover",
				},
				{
					name: "歌单",
					path: "/findmusic/recsonglist",
				},
				{
					name: "排行榜",
					path: "/findmusic/songrank",
				},
				{
					name: "歌手",
					path: "/findmusic/singer",
				},
				{
					name: "最新音乐",
					path: "/findmusic/newsongs",
				},
			],
		};
	},
}
</script>

<style lang="less" scoped>
.music-content {
	overflow-y: scroll;
  // 为啥要设置这高度才行？
  // height: 100vh + 10px;
  height: 100vh;
}
</style>
