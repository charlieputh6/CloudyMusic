<template>
  <div class="bd">
  <!-- 左侧封面 -->
    <div class="left-img" @click="rankClick(item.id)">
      <transition name="el-fade-in-linear">
        <div class="mask-playicon" v-show="isShowPlay">
          <span class="iconfont icon-yunhang"></span>
        </div>
      </transition>
      <img :src="item.coverImgUrl" alt="" />
    </div>
  <!-- 右侧歌曲列表 -->

    <div class="right-songlist">
      <el-table size="small" :data="songs" stripe style="width:100%" show-header="false"  @row-dblclick="playMusic">
        <el-table-column label="序号" width="20">
          <template v-slot="scope">
            <span :class="{hot:scope.row.index < 3 }">{{scope.row.index+1}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="歌曲" :show-overflow-tooltip="true"></el-table-column>

        <!--  align="right" 单元格中向右对齐-->
        <el-table-column prop="name" align="right" label="歌手" :show-overflow-tooltip="true"></el-table-column>
      </el-table>

      <div class="more" @click="rankClick(item.id)">查看全部 ></div>
    </div>


  </div>
</template>

<script>
export default {
  props: {
		item: {
			type: Object,
			default() {
				return {};
			},
		},
	},
  data(){
    return {
      isShowPlay:false,
      songs:{}
    }
  },
  methods:{
    playMusic(song){
      // 更新播放状态
      this.$store.dispatch("changePlayState", true);
      //提交vuex保存当前歌曲详情
      this.$store.dispatch("saveSongDetail", song);
      // 提交vuex添加到播放列表
      this.$store.dispatch("addPlayinglist", song);
    }
  },
  rankClick(id){
    //点击后根据歌单id 跳转歌单详情页
		this.$router.push("/songlistdetail/" + id);
    this.isShowPlay = false
  }
}
</script>

<style lang="less" scoped>
.bd {
	display: flex;
	height: 230px;
	.left-img {
		position: relative;
		width: 200px;
		height: 200px;
		cursor: pointer;
		img {
			height: 100%;
		}
	}
	.right-songlist {
		width: 84%;
		padding-left: 20px;
		height: 230px;
		.more {
			cursor: pointer;
			font-size: 12px;
		}
	}
}
.hot {
	color: var(--themeColor);
}
</style>
