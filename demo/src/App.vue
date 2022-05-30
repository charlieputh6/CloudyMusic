<template>
  <div id="app">
  <el-container>
  <el-header class="head">
    <!-- 头部 -->
    <Header/>
  </el-header>
  <el-container >
    <el-aside width="230px">
      <Side/>
    </el-aside>
    <el-main class="main">
    <Main/>
    </el-main>
  </el-container>
  </el-container>
  <Footer/>



  </div>
</template>

<script>

import Header from './layout/Header.vue';
import Side from './layout/Side.vue';
import Footer from './layout/Footer.vue';
import Main from './layout/Main.vue';
export default {
    name: "App",
    components: {  Header, Footer, Side, Main }
}
</script>


<!-- 这里不能加scoped -->
<style lang="less" >
@import "./assets/css/base.css";
body{
	width: 100%;
	height: 100vh;
	position: fixed;
  .head{
    padding: 0;
    margin: 0;
  }
  .main{
    padding: 0;
    margin: 0;
  }

}
</style>
