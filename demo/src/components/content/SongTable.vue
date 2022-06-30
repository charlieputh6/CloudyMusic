<template>
  <div class="songTable">
    <el-table
      :data="songs"
      style="width: 100%;font-size:18px"
      empty-text="数据加载中"
      stripe
      @row-dblclick="playSongClick"
      >
      <el-table-column width="50">

        <!-- 放置小喇叭还是序号 -->
            <template v-slot="scope">
            <!-- 是正在播放还是静音 -->
            <!-- 当前歌曲是小喇叭 -->
            <!-- <span>{{scope.row.songId}}---</span> -->
              <div v-if="scope.row.songId === nowSongDetail.id" style="color:var(--themeColor);font-size:28px">

                  <span v-if="isPlaying">
                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-laba"></use></svg>
                  </span>
                  <span v-else>
                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-shengyinguanbi"></use></svg>
                  </span>
                </div>
                <!-- 不是的话就是序号 -->
              <span v-else>{{scope.$index | formatIndex}}</span>
            </template>
      </el-table-column>

      <!-- 操作按钮(喜欢 收藏 添加) -->
			<el-table-column width="120">
				<template v-slot="scope">
					<div class="operation">
						<span @click="likeSong(scope.row)" style="color:var(--themeColor)">
              <span v-if="likeSongIds.indexOf(scope.row.songId) === -1" >
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-aixin"></use></svg>
              </span>
              <span v-else>
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-xihuan"></use></svg>
              </span>
						</span>
            <span @click="downloadCurrentMusic(scope.row)" title="下载">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-xiazai1"></use></svg>
            </span>
            <span  @click="addSong(scope.row)" title="添加到播放列表">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-tianjia"></use></svg>
            </span>
					</div>
				</template>
			</el-table-column>

      <el-table-column
      prop="songName"
      label="歌曲"
      :show-overflow-tooltip="true"
      width="300">
      </el-table-column>


      <!-- 专辑 -->
      <el-table-column
      prop="albumName"
      label="专辑"
      :show-overflow-tooltip="true"
      width="300"
      >
      </el-table-column>

      <!-- 到时候可以发请求通过歌手id查找歌手姓名 多个歌手需要循环-->
      <el-table-column
      prop="singerVos[0].name"
      label="歌手姓名"
      :show-overflow-tooltip="true"
      width="200">
      <!-- <template v-slot="scope">
         <span @click="toSinger(scope.row.id)" >charlieputh</span>
      </template> -->
      </el-table-column>



      <el-table-column
      prop="playTime"
      label="歌曲时长"
      :show-overflow-tooltip="true"
      width="200">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
		...mapGetters(["isPlaying", "nowSongDetail", "isLogin", "userInfo", "userSongList", "likeSongIds"]),
	},
  created(){

    // 获取用户的喜欢歌曲列表
    // 如果没有用户的喜欢列表  才去获取
    if(this.isLogin && this.likeSongIds.length===0){
      console.log("???");
      this.getUserLikeSongs();
    }
    // console.log(this.likeSongIds);

  },
  filters: {
		formatIndex(index) {
      index++;
      return index<10?'0'+index:index;
    },
    formatDuration(time){
      let m = parseInt(time / 60 % 60)
          m = m < 10 ? '0' + m : m
      let s = parseInt(time % 60)
        s = s < 10 ? '0' + s : s
        return m+" : "+s;
    }
	},
  props:{
    songs:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  methods:{
    // 实现当前播放歌曲行显示小喇叭
		tableRowClassName({ row, rowIndex }) {
			row.index = rowIndex+1;
			return;
		},
    //每行歌曲双击播放
  	// 双击播放列表的歌曲
    async playSongClick(item){
      // console.log("song"+item.songId);
      // 请求这首歌的详细数据
      const { data: res } = await this.$http.get("/music/getmusic", {params: { musicId:item.songId} });
      let song = res.data;
      // 更新播放状态
      this.$store.dispatch("changePlayState", true);
      //提交vuex保存当前歌曲详情
      this.$store.dispatch("saveSongDetail", song);
      //提交vuex添加到播放列表
      this.$store.dispatch("addPlayinglist",song)
    },
    // 添加喜欢或者不喜欢某歌曲(还未实现功能)
    likeSong(song){
      // 先判断登录状态
			if (!this.$store.state.isLogin) {
				this.$message({
					type: "warning",
					message: "登录后才能收藏",
					showClose: true,
					center: true,
				});
				return;
			}
			// 判断传入参数是喜欢还是不喜欢
			let like = this.likeSongIds.indexOf(song.songId) !== -1 ? false : true;
			// 如果是在用户喜欢的歌单点击的取消喜欢---

			// 否则不在用户喜欢的歌单 直接调接口

			this.likeNowSongBy(song, like);
      // console.log(song);
      // console.log(this.userInfo);
      console.log("喜欢"+this.likeSongIds);

    },
    async likeNowSongBy(song,like){
      console.log("是否添加"+like);
      if (like === true) {
        this.likeSongIds.push(song.songId);
        const { data: res } = await this.$http.get("/like-music/addlikemusic", {params:{musicId: song.songId}});
        if(res.code==200){
          this.$message({
            message: "已添加到我喜欢的音乐",
            type: "success",
            center: true,
          });
          this.islike = true;
        }else{
          this.$message.warning("添加操作失败,请重试");
        }

      } else {
        this.likeSongIds.pop(song.songId);
        const { data: res } = await this.$http.get("/like-music/deletelikemusic", {params:{musicId: song.songId}});
        if(res.code == 200){
          this.$message({
            message: "取消喜欢成功",
            type: "success",
            center: true,
          });
          this.islike = false;
        }else{
          this.$message.warning("取消操作失败,请重试");
        }

      }
    },
    // 下载歌曲
    downloadCurrentMusic(song) {
      console.log("下载还未实现");
    },
    // 添加歌曲
		addSong(song) {
			// 提交vuex添加到播放列表
			this.$store.dispatch("addPlayinglist", song);
			this.$message({
				message: "已添加到播放列表",
				type: "success",
				center: true,
			});
		},
    // 获取用户的喜欢歌曲列表
    async getUserLikeSongs(){
      console.log(this.userInfo);
      const { data: res } = await this.$http.get("/like-music/getlikelist", {params:{userId:this.userInfo.id}});
      this.$store.dispatch("saveUserSongList", res.data);
      // if(res.data.length !=0)
      //   thi
    },
  }
}
</script>

<style lang="less" scoped>
.songTable{
  width: 100%;
  padding-right:100px;
  .operation{
    span {
      cursor: pointer;
      &:hover {
        color: var(--themeColor);
      }
    }
  }
  .color{
    svg{
        color: var(--themeColor);
        cursor: pointer;
        margin-top: 2px;
        font-size: 20px;
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
