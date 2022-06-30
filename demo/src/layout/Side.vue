<template>
	<div id="aside">
		<!-- 主路由导航 -->
		<el-menu router :default-active="defaultActive">
			<el-menu-item v-for="(item, index) in subnavitem" :key="index" :index="item.path">
			<img :src="item.icon" alt="" >
				<span>{{ item.name }}</span>
			</el-menu-item>

      <el-divider></el-divider>
			<div class="mycreat" v-show="createdSongList.length >=1">
				<h2>我创建的歌单</h2>
        <!-- 循环用户歌单列表 -->
        <el-menu-item v-for="item in createdSongList" :key="item.id" :index="'/songlistdetail/' + item.id">
          <span>
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
          </span>
          <span>{{item.name}}</span>
        </el-menu-item>

			</div>
		</el-menu>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name:'Side',
  computed: {
		...mapGetters(["userSongList", "userInfo"]),
  },
  data() {
		return {
			defaultActive: "/findmusic",
      createdSongList:"",
			subnavitem: [
				{ name: "发现音乐", path: "/findmusic", icon: require("../assets/img/findMusic.png") },
				{ name: "推荐视频", path: "/recvideo", icon: require("../assets/img/video.png") },
				{ name: "每日推荐", path: "/receveryday", icon: require("../assets/img/like.png") },
				{ name: "我的收藏", path: "/myfavorite", icon: require("../assets/img/collection.png") },
			],
			collectIndex: null,
		};
	},
  created(){
    this.getlist();
  },
  mounted(){
    this.getlist();
  },
  methods:{
    myFavorite(){
      this.$router.push("/mylove");
    },
    async getlist(){
      const { data: res } = await this.$http.get("/list/getlist");
      // console.log(res);
      this.createdSongList = res.data;
    }
  }
}
</script>

<style lang="less" scoped>
#aside{
  height: 100%;
	width: 230px;
	overflow-y: scroll;
	border-right: 1px solid #dddddd;
	padding-top: 2px;
  font-size: 16px;
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
  .mycreat{


    h2{
      padding: 0 20px;
      padding-bottom: 20px;
      font-size: 16px;
    }
    span{
      &:hover{
      cursor: pointer;
    }
    }

  }

}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>
