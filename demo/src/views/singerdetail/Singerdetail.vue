<template>
	<div id="singer-detail">
		<!-- 歌手基本信息 -->
		<SingerInfo :singer-info="singerInfo"/>
		<!-- 歌手作品信息 -->
		<div class="singer-works">
			<el-tabs @tab-click="tabClick">
				<!-- 专辑列表 -->
				<el-tab-pane label="专辑"></el-tab-pane>
				<!-- 热门50首 -->
				<el-tab-pane label="热门歌曲">
					<SingerHotsong :hotsong="hotsong" />
				</el-tab-pane>

				<!-- 歌手详情 -->
				<el-tab-pane label="歌手详情">
					<div class="singer-desc" v-if="singerInfo.briefDesc">
						<p v-html="singerInfo.briefDesc"></p>
					</div>
					<div class="no" v-else>
						<el-empty description="暂无详情介绍" :image-size="200"></el-empty>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
/* vuex */
import { mapGetters } from "vuex";
/* 子组件 */
import SingerInfo from "./Childcomps/SingerInfo.vue";
import SingerHotsong from "./Childcomps/SingerHotsong.vue";
export default {
	inject: ["reload"],
	name: "Singerdetail",
	components: {
    SingerInfo,
		SingerHotsong,
	},
	computed: {
		...mapGetters(["subSingerlist"]),
	},
	data() {
		return {
			id: "", //歌手id
			singerInfo: {}, //歌手基本信息
			albumSize: 0, //专辑数量
			hotsong: [], //歌手热门歌曲
			albumlist: [], //歌手专辑列表
		};
	},
	created() {
		// 保存歌手id
		this.id = this.$route.params.id;
		// 根据歌手id获取歌手基本信息
		this.getSingerDetailBy();
		// 默认获取歌手第一页 30张专辑
		this.getSingerAlbumBy();
	},

	methods: {

		// 获取歌手热门歌曲50首
		getSingerHotSongBy() {
			getSingerHotSong(this.id).then(res => {
				this.hotsong = res.data.hotSongs;
			});
		},
		// 获取歌手专辑
		getSingerAlbumBy(page = 1) {
			let offset = (page - 1) * 30;
			getSingerAlbum(this.id, offset).then(res => {
				this.albumlist = res.data.hotAlbums;
			});
		},

		/*
		事件监听
		*/
		//tabs切换点击事件
		tabClick(tabs) {
			if (tabs.label === "热门歌曲") {
				// 获取歌手热门歌曲50首
				this.getSingerHotSongBy();
			}
			if (tabs.label === "MV") {
				// 获取歌手MV
				this.getSingerMvBy();
			}
			if (tabs.label === "相似歌手") {
				// 获取相似歌手
				this.getSingerSimilarBy();
			}
		},

	},
};
</script>

<style lang="less" scoped>
.singer-desc {
	text-indent: 28px;
	line-height: 28px;
}
.no {
	width: 100%;
	text-align: center;
	font-size: 24px;
	font-weight: 700;
}
</style>
