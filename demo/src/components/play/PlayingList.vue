<template>
  <div class="playing-list" id="playing-song-list">
      <!-- 顶部导航 -->
      <div class="top-nav">
        <TabBar  :tabitems="tabitems" @tabItemClick="tabItemCLick"/>
      </div>
<!-- 播放列表 -->
      <div class="play-list"  v-if="activeItem===0">
          <!-- 总的信息 共多少首 -->
      <div class="hd">
        <h4 style="padding:0 10px">当前列表总共{{playingList.length}}首歌曲</h4>
        <span @click="deleteAll"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shanchu"></use></svg>清空</span>
      </div>
      <!-- 主体  歌曲列表 -->
      <div class="bd">
      <template>
        <el-table
          :show-header="false"
          :data="playingList"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          empty-text="列表暂无歌曲"
          stripe
          @row-dblclick="playSongClick"
          >
          <el-table-column width="50">
            <!-- 放置小喇叭还是序号 -->
            <template v-slot="scope">
            <!-- 是正在播放还是静音 -->
            <!-- 当前歌曲是小喇叭 -->
              <div v-if="scope.row.id === nowSongDetail.id">
                  <span v-if="isPlaying">
                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-laba"></use></svg>
                  </span>
                  <span v-else>
                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-shengyinguanbi"></use></svg>
                  </span>
                </div>
                <!-- 不是的话就是序号 -->
              <span v-else>{{scope.row.index | formatIndex}}</span>
            </template>


          </el-table-column>

          <el-table-column
          prop="name"
          label="歌曲"
          :show-overflow-tooltip="true"
          width="100">
          </el-table-column>
          <!-- 到时候可以发请求通过歌手id查找歌手姓名 -->
          <el-table-column el-table-column
          prop=""
          label="歌手姓名"
          :show-overflow-tooltip="true"
          width="100">
          <template v-slot="scope">
            <span @click="toSinger(scope.row.id)" >charlieputh</span>
          </template>
          </el-table-column>

          <el-table-column el-table-column
          prop="play_time"
          label="歌曲时长"
          :show-overflow-tooltip="true"
          width="100">
          <template v-slot="scope">
                <span>
                  {{ scope.row.play_time | formatDuration }}
                </span>
              </template>
          </el-table-column>

          <el-table-column width="60">
              <template v-slot="scope">
                <span @click="deleteSong(scope.row)">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-guanbi"></use></svg>
                </span>
              </template>
            </el-table-column>


        </el-table>

  </template>

      </div>
      </div>

<!-- 历史记录 -->
      <div class="history-list"  v-if="activeItem===1">
          <!-- 总的信息 共多少首 -->
      <div class="hd">
        <h4 style="padding:0 10px">当前列表总共{{historyPlay.length}}首歌曲</h4>
        <span @click="deleteAllHistory"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shanchu"></use></svg>清空</span>
      </div>
      <!-- 主体  歌曲列表 -->
      <div class="bd">
      <template>
        <el-table
          :show-header="false"
          :data="historyPlay"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          empty-text="列表暂无歌曲"
          stripe
          @row-dblclick="playHistorySong"
          >
          <el-table-column width="50">
            <!-- 放置小喇叭还是序号 -->
            <template v-slot="scope">
            <!-- 是正在播放还是静音 -->
            <!-- 当前歌曲是小喇叭 -->
              <div v-if="scope.row.id === nowSongDetail.id">
                  <span v-if="isPlaying">
                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-laba"></use></svg>
                  </span>
                  <span v-else>
                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-shengyinguanbi"></use></svg>
                  </span>
                </div>
                <!-- 不是的话就是序号 -->
              <span v-else>{{scope.row.index | formatIndex}}</span>
            </template>


          </el-table-column>

          <el-table-column
          prop="name"
          label="歌曲"
          :show-overflow-tooltip="true"
          width="100">
          </el-table-column>
          <!-- 到时候可以发请求通过歌手id查找歌手姓名 -->
          <el-table-column el-table-column
          prop=""
          label="歌手姓名"
          :show-overflow-tooltip="true"
          width="100">
          <template v-slot="scope">
            <span @click="toSinger(scope.row.id)" >charlieputh</span>
          </template>
          </el-table-column>

          <el-table-column el-table-column
          prop="play_time"
          label="歌曲时长"
          :show-overflow-tooltip="true"
          width="100">
          <template v-slot="scope">
                <span>
                  {{ scope.row.play_time | formatDuration }}
                </span>
              </template>
          </el-table-column>

          <el-table-column width="60">
              <template v-slot="scope">
                <span @click="deleteHistory(scope.row)">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-guanbi"></use></svg>
                </span>
              </template>
            </el-table-column>


        </el-table>

  </template>

      </div>
      </div>

    </div>
</template>

<script>
import TabBar from '../common/TabBar.vue';
import { mapGetters } from "vuex";
export default {
  computed: {
		...mapGetters(["playingList", "historyPlay", "nowSongDetail", "isPlaying"]),
  	},
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
      },
      // 双击播放列表的歌曲
      playSongClick(song){
        // 更新播放状态
					this.$store.dispatch("changePlayState", true);
					//提交vuex保存当前歌曲详情
					this.$store.dispatch("saveSongDetail", song);
          // 将双击事件传出去
      this.$emit("toPlaySong");
      },
      // 删除播放列表单曲
		deleteSong(song) {
			this.$store.dispatch("deleteSong", song.id);
		},
		// 清空播放列表
		deleteAll() {
			this.$store.dispatch("deleteAll");
			// this.$store.dispatch("saveCurrentLyric", []);
		},
		// 双击历史记录歌曲
		playHistorySong(song) {
			// 播放歌曲
			this.playSongClick(song);
			// 提交vuex添加到播放列表
			this.$store.dispatch("addPlayinglist", song);


		},
		// 清空播放历史记录
		deleteAllHistory() {
			this.$store.dispatch("deleteAllHistory");
		},
		// 删除历史记录单曲
		deleteHistory(song) {
			this.$store.dispatch("deleteHistory", song.id);
		},
		// 实现当前播放歌曲行显示小喇叭
		tableRowClassName({ row, rowIndex }) {
			row.index = rowIndex+1;
			return;
		},
    },
    filters: {
      formatIndex(index) {
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
    mounted(){
      // 点击其他区域(不包括下面和右边)就关闭播放列表
		let playingList = document.querySelector("#playing-song-list");
		let footer = document.querySelector("#footer");
		document.addEventListener("mousedown", e => {
      console.log(e);
			if (playingList) {
				if (!playingList.contains(e.target) && !footer.contains(e.target)) {
					this.$emit("closePlayList");
				}
			}
		});
    }
}
</script>

<style lang="less" scoped>
.playing-list{
  z-index: -1;
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
.hd{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  span{
    padding-right: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    svg{
      font-size: 28px;
    }
  }
}
.bd{
  height: 100%;
  overflow-y: scroll;
  svg{
    color: var(--themeColor);
		cursor: pointer;
    margin-top: 2px;
    font-size: 20px;
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
