<template>
<div class="login">
  <!-- 头像 -->
  <div class="avatar">
    <el-avatar :size="40" icon="el-icon-user-solid"></el-avatar>
    <span class="goLogin">点击头像登录</span>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      circleUrl:"../assets/img/photo.jpg"
    }
  }
}
</script>

<style lang="less" scoped>
.avatar{
  display: flex;
  align-items: center;
  color: #FFF;
  .goLogin{
    margin-left: 5px;
  }
}
</style>
