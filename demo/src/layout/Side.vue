<template>
	<div id="aside">
		<!-- 主路由导航 -->
		<el-menu router :default-active="defaultActive">
			<el-menu-item v-for="(item, index) in subnavitem" :key="index" :index="item.path">
			<img :src="item.icon" alt="" >
				<span>{{ item.name }}</span>
			</el-menu-item>
			<!-- 登录后的 -->
			<!-- <div class="mycreat" v-if="userSongList.length >= 1">
				<p class="by">我创建的歌单</p>
				<el-menu-item v-for="item in createdSongList" :key="item.id" :index="'/songlistdetail/' + item.id">
					<span class="iconfont icon-xihuan"></span>
					<span>{{ item.name }}</span>
				</el-menu-item>
			</div>
			<div class="collect" v-if="userSongList.length > 1">
				<p class="by">我收藏的歌单</p>
				<div class="person">
					<el-menu-item v-for="item in collectSongList" :key="item.id" :index="'/songlistdetail/' + item.id">
						<span class="iconfont icon-gedan"></span>
						<span>{{ item.name }}</span>
					</el-menu-item>
				</div>
			</div> -->
		</el-menu>
	</div>
</template>

<script>
export default {
  name:'Side',
  data() {
		return {
			defaultActive: "/findmusic",
			subnavitem: [
				{ name: "发现音乐", path: "/findmusic", icon: require("../assets/img/findMusic.png") },
				{ name: "推荐视频", path: "/recvideo", icon: require("../assets/img/video.png") },
				{ name: "每日推荐", path: "/receveryday", icon: require("../assets/img/like.png") },
				{ name: "我的收藏", path: "/myfavorite", icon: require("../assets/img/collection.png") },
			],
			collectIndex: null,
		};
	},
}
</script>

<style lang="less" scoped>
#aside{
  height: 100%;
	width: 230px;
	overflow-y: scroll;
	border-right: 1px solid #dddddd;
	padding-top: 2px;
	.el-menu {
		border-right: 0;
    img{
      width: 16px;
    }
    .el-menu-item {
		height: 53px;
		line-height: 53px;
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
  .el-menu-item.is-active {
		color: var(--base-black);
		font-weight: 700;
		background: rgb(245, 245, 245, 0.3) !important;
	}
	}

}

</style>
