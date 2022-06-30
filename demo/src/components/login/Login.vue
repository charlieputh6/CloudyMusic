<template>
<div class="login">
  <!-- 头像 -->
  <!-- 未登录 -->
  <div class="avatar" @click="showLogin" v-if="!userInfo">
    <el-avatar :size="40" icon="el-icon-user-solid"></el-avatar>
    <span class="goLogin">去登录</span>
  </div>
  <!-- 已登录 -->
  <div class="avatar" @click="exit" v-else>
    <img :src="userInfo.portrait" alt="" >
    <span>{{userInfo.nickName}}</span>
  </div>
  <div class="form-login" v-show="isShowLogin">
      <!-- 登录表单弹框 -->
		<transition name="el-fade-in-linear">
			<div>
        <!-- 关闭按钮 -->
        <div class="close" @click="isShowLogin = false">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>

        <!-- 账号登录 -->
        <div class="account-login">
          <h2>Music</h2>
          <!--logo -->
          <div class="logo">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinle"></use>
            </svg>
          </div>
          <!-- 登录表单 -->
          <div class="form">
            <el-form label-width="70px">
              <el-form-item label="登录账号">
                <el-input v-model="loginForm.account" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login" style="width:100%">登录</el-button>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="register" style="width:100%">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
		</transition>
  </div>

</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created(){
    if(!this.userInfo)
      this.userInfo = localStorage.getItem("userInfo");
  },
  data(){
    return{
      circleUrl:"../assets/img/photo.jpg",
      isShowLogin:false,  //是否展示登录弹窗
      // 输入框的验证码
      code: "",
      loginForm: {
        account: "",
        password: "",
      },
    }
  },
  computed: {
		// 将 store 中的 getter 映射到局部计算属性
		...mapGetters(["userInfo"]),
	},
  methods:{
    // 显示登录框
    showLogin(){
      this.isShowLogin = true;
    },
    // 登录请求
    async login(){
      const { data: res } = await this.$http.post("/user/login", this.loginForm);
        console.log(res);
        if (res.code != 200) {
          return this.$message.error("用户名或密码错误,登录失败");
        } else {
          // 保存token
          window.sessionStorage.setItem("token", res.token);
          // 更新登录状态
		    	this.$store.dispatch("updateLogin", true);
          localStorage.setItem("isLogin",JSON.stringify(true));
          // this.setItem("isLogin",true);
          // 保存用户信息
          this.$store.dispatch("saveUserInfo", res.data);
          localStorage.setItem("userInfo",JSON.stringify(res.data));
          // this.setItem("userInfo",res.data);
          this.$message.success("登录成功");
          this.isShowLogin = false;
          console.log(this.userInfo);
          this.getUserLikeSongs();
          window.location.reload();
        }
    },
    // 获取用户的喜欢歌曲列表
    async getUserLikeSongs(){

      const { data: res } = await this.$http.get("/like-music/getlikelist");
      // console.log(res.data);
      let likeSongIds=[];
      // console.log(res.data.length);
      if((res.data.length) !=0){
        for(let i=0;i<res.data.length;i++)
          likeSongIds.push(res.data[i].id);
      }
      // 喜欢的歌的id
      this.$store.dispatch("saveLikeSongIds", likeSongIds);
      // 喜欢的歌曲列表 用于我喜欢
      this.$store.dispatch("saveUserSongList", res.data);
      // console.log("喜欢"+likeSongIds);

    },
    // 退出登录
    exit(){
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        window.sessionStorage.clear();
        window.localStorage.clear();
        // 强制刷新页面
        location. reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退出失败'
        });
      });
    },
    register(){}
    // 注册
    /*
    async register() {
      const { data: res } = await this.$http.post("add", this.loginForm);
      console.log(res);
      if (res.status != 200) {
        return this.$message.error("注册失败");
      } else {
        const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res);
        if (res.status != 200) {
          return this.$message.error("注册失败");
        } else {
          // 保存token
          console.log(res.data);
          window.sessionStorage.setItem("token", res.data);
          this.$message.success("注册成功");
          this.$router.push("/index");
        }
      }
    },*/
  }
}
</script>

<style lang="less" scoped>
.form-login{
  position: absolute;
	top: 120px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 99;
	box-shadow: 0px 0px 5px 5px #eee;
	background: #dcdcdc;
	border-radius: 10px;
	width: 400px;
	height: 520px;
	background: #fff;
	text-align: center;
	.close {
		text-align: right;
		cursor: pointer;
		padding: 10px 20px 0 0;
		font-size: 22px;
	}
  .account-login{

    h2{
      padding-left: 33px;
      color: var(--themeColor);
    }
    .logo{
      padding-left: 33px;
      font-size: 100px;
      padding-bottom: 10px;
      color: var(--themeColor);
    }
  }
  .form {
	padding-right: 30px;
}
}
.avatar{
  display: flex;
  align-items: center;
  color: #FFF;
  cursor: pointer;
  .goLogin{
    margin-left: 5px;
  }
  img{
    height: 50px;
    padding-right: 5px;
    border-radius: 50%;
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
