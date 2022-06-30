<template>
	<div class="singer-info">
		<!-- 左侧封面 -->
		<div class="left-cover">
			<img :src="cover"/>
		</div>
		<!-- 右侧信息 -->
		<div class="right-info">
			<!-- 歌手名 -->
			<div class="singer-name">
				<el-tag effect="plain" class="stag">歌手</el-tag>
				<h2>{{ singerInfo.name }}</h2>
			</div>
			<!-- 相关操作 -->
			<div class="operation">
				<el-button type="primary" icon="el-icon-video-play">收藏</el-button>
        <el-button icon="el-icon-share">分享</el-button>
			</div>
			<!-- 作品数量 -->
			<div class="count">
				<div class="item-count">
					<svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinle1"></use>
          </svg>
					<span>单曲数：{{ singerInfo.musicSize }}</span>
				</div>
				<div class="item-count">
					<svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhuanji"></use>
          </svg>
					<span>专辑数：{{ singerInfo.albumSize }}</span>
				</div>
				<div class="item-count">
					<svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-MV"></use>
          </svg>
					<span>MV数：{{ singerInfo.mvSize }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SingerInfo",
	props: {
    cover:"s",
		singerInfo: {
			type: Object,
			default() {
				return {};
			},
		},
	},
};
</script>

<style lang="less" scoped>
.singer-info {
	display: flex;
	align-items: center;
	.left-cover {
		position: relative;
		flex: 1;
		img {
			width: 100%;
		}
	}
	.right-info {
		flex: 4;
		padding-left: 15px;
		.singer-name {
			display: flex;
			.stag {
				height: 30px;
				font-size: 16px;
				font-weight: 700;
			}
			h2 {
				padding-left: 15px;
				font-size: 22px;
			}
		}
		.operation {
			padding-top: 15px;
		}
		.count {
			padding-top: 15px;
			.item-count {
				padding-bottom: 5px;
				span {
					padding-left: 10px;
				}
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
