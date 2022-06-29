<template>
	<div class="theme">
		<div class="theme-item" v-for="(item, index) in themeList" :key="index" @click="changeTheme(item, index)">
			<div :style="{ background: item.themeColor }" class="bg">
				<i class="el-icon-check  right" v-if="currentIndex === index"></i>
			</div>
			<div>{{ item.title }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Themepicker",
	data() {
		return {
			themeList: [
				{
					title: "蓝色",
					themeColor: "#409eff",
				},
				{
					title: "红色",
					themeColor: "#ec4141",
				},
				{
					title: "绿色",
					themeColor: "#2bb669",
				},
				{
					title: "橘色",
					themeColor: "#ff8f57",
				},
				{
					title: "粉色",
					themeColor: "#ff5c8a",
				},
				{
					title: "金色",
					themeColor: "#e2ab12",
				},
			],
			currentIndex:  0,
		};
	},
	created() {

	},
	methods: {
		changeTheme(item, index) {
      for (let k in item) {
				if (k !== "title") {
          // 修改主题颜色
					document.documentElement.style.setProperty(`--${k}`, item[k]);
				}
			}
			this.currentIndex = index;
    }
	},
};
</script>

<style lang="less" scoped>
.theme {
	height: 120px;
	padding: 10px 0 0 10px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	.theme-item {
		margin-right: 10px;
		width: 30px;
		height: 30px;
		font-size: 12px;
		text-align: center;
		cursor: pointer;
		.bg {
			position: relative;
			width: 100%;
			height: 100%;
		}
	}
}
.right{
  color: #fff;
  font-size: 30px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
