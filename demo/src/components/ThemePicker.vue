<template>
	<div class="theme">
		<div class="theme-item" v-for="(item, index) in themeList" :key="index" @click="changeTheme(item, index)">
			<div :style="{ background: item.themeColor }" class="bg">
				<i class="el-icon-check" v-if="currentIndex === index"></i>
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
					mycompColor: "#5292fe",
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
.icon-duihao {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #fff;
	font-size: 18px;
	font-weight: 700;
}
</style>
