<template>
	<div id="header">
    <div class="left">
      	<!-- 标题logo -->
		<div class="title">
			<span><img src="../assets/img/wyy.png" alt=""></span>
      <span>Music</span>
		</div>
    <!-- 前进后退 -->
    <div class="operation">
      <span @click="goBack"><i class="el-icon-arrow-left" style="width:10px"></i> </span>
      <span @click="goForward"><i class="el-icon-arrow-right"></i> </span>
    </div>
    <!-- 搜索框 -->
    <div>
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect">
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix"
          @click="handleIconClick">
        </i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="addr">{{ item.address }}</span>
        </template>
      </el-autocomplete>
    </div>

  </div>

  <div class="right">
  <!-- 右侧登录 -->
      <div class="login" >
        <Login/>
      </div>
      <!-- 主题 -->
      <div class="pifu">
        <span v-popover:popover slot="reference"><img src="../assets/img/pifu.png" alt=""></span>
        <el-popover ref="popover" placement="bottom" width="150" trigger="hover">
          <ThemePicker/>
        </el-popover>
      </div>
  </div>

</div>
</template>

<script>
import Login from '../components/login/Login.vue';
import ThemePicker from '../components/ThemePicker.vue';
export default {
    name: "Header",
    data(){
      return {
        state:"搜索",
      }
    },
    components: { Login, ThemePicker },
    methods:{
      goBack(){

      },
      goForward(){

      },
      handleSelect(){

      },
      handleIconClick(){

      },
      querySearch(){}
    }
}
</script>
<style lang="less" scoped>
#header{
  display: flex;
  background: var(--themeColor);
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  img{
    height: 40px;
    border-radius: 50%;
  }
  .left{
    display: flex;
    .title{
      color: #fff;
      margin-left: 20px;
      font-size: 22px;
      font-family: Arial, Helvetica, sans-serif;
    }
    .operation{
      width: 100px;
      display: flex;
      margin-left: 80px;
      align-items: center;
      font-size: 20px;
      justify-content: space-around;
      color: #fff;
      span {
			display: flex;
      justify-content: center;
			width: 30px;
			height: 30px;
			text-align: center;
      align-items: center;
			line-height: 30px;
			// background: rgba(100, 149, 237, 1);
			background: rgba(105, 105, 105, 0.1);
			border-radius: 50%;
			cursor: pointer;
		}
    }
  }
  .right{
    margin-right: 30px;
    display: flex;
    padding: 0 10px;
    .pifu{
      display: flex;
      align-items: center;
      margin-left: 10px;
      img{
        height: 30px;
      }
    }
  }
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
