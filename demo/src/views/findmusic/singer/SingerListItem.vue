<template>
  <!-- 每一个 歌手 -->
  <div class="song-list-item" @click="listItemClick">
    <!-- 歌手封面图片 -->
    <div class="item-img">
      <!-- 图片本身 -->
      <img :src="singeritem.cover" alt="">
    </div>
    <!-- 歌单下的文字描述 -->
		<div class="item-text">
			<div>{{ singeritem.name }}</div>
		</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isShowPlay:false,
    }

  },
  props: {
		singeritem: {
			type: Object,
			default() {
			},
		},
	},
  methods:{
    listItemClick(){},
  }
}
</script>

<style lang="less" scoped>
.item {
	width: 100%;
	height: 100%;
	cursor: pointer;
	margin-bottom: 15px;
	.item-img {
		position: relative;
		img {
      background-color: var(--themeColor);
			width: 100%;
		}
		.mask1 {
			position: absolute;
			top: 100;
			width: 100%;
			height: 30px;
			line-height: 30px;
			text-align: right;
			color: #fff;
			font-size: 13px;
			padding-right: 7px;
			span {
				padding-left: 5px;
			}
		}
		.mask2 {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 30px;
			line-height: 30px;
			text-align: left;
			color: #fff;
			font-size: 13px;
			padding-left: 7px;
			span {
				padding-right: 5px;
			}
		}
    .mask-playicon{
      font-size: 88px;
    }
	}
	.item-text {
		margin: 5px 0;
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
