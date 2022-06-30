<template>
  <!-- 每一项 歌单 -->
  <div class="item" @click="listItemClick">
    <!-- 歌单封面图片 -->
    <div class="item-img" @mouseenter="showIcon" @mouseleave="closeIcon">
      <!-- 图片上的播放图标 -->
      <transition name="el-fade-in-linear">
        <div class="mask-playicon"  v-show="isShowPlay">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yunhang"></use>
          </svg>
        </div>
      </transition>
      <!-- 图片上的播放量 -->
      <div class="mask1">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>{{songlistitem.playTime}}</span>
      </div>
      <!-- 图片上的歌单作者名字 -->
      <!-- <div class="mask2">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jurassic_user"></use>
        </svg>
        <span>{{songlistitem.user_id}}</span>
      </div> -->
      <!-- 图片本身 -->
      <img :src="songlistitem.cover" alt="">

    </div>
    <!-- 歌单下的文字描述 -->
		<div class="item-text">

			<div v-if="songlistitem.listName">{{ songlistitem.listName}}</div>
      <div v-else>{{songlistitem.albumName}}</div>
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
		songlistitem: {
			type: Object,
			default() {
			},
		},
	},
  methods:{
    // 根据点击的歌单id，跳转歌单详情页
    listItemClick(){
      this.$router.push("/songlistdetail/"+this.songlistitem.listId);
      this.isShowPlay = false;
    },

    showIcon() {
			this.isShowPlay = true;
		},
		closeIcon() {
			this.isShowPlay = false;
		},
  }
}
</script>

<style lang="less" scoped>
// .item{
//   float: left;
// }
// .img-self{
//   background-color: var(--themeColor);
//   width: 180px;
//   height: 180px;
//   img{
//    width: 100%;
//   }
// }
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
    text-align: center;
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
