<template>
  <div class="topDesc">
    <!-- 左侧图片 -->
    <div class="left-img">
      <img :src="playlist.cover" v-if="playlist.cover">
      <img :src="imgUrl" alt="" v-else>
    </div>
    <!-- 右侧描述 -->
    <div class="right-desc">
      <!-- 歌单标题 -->
      <div class="title">
        <el-tag effect="plain" class="stag">歌单</el-tag>
        <h2>{{playlist.name}}</h2>
      </div>
      <!-- 歌单创建者信息 -->
      <div class="creator-info">
        <!-- 头像 -->
        <div class="avator">
          <img :src="playlist.portrait" v-if="playlist.portrait">
          <el-avatar :size="48" icon="el-icon-user-solid" v-else></el-avatar>
        </div>
        <!-- 名字 -->
        <div class="name"><span>{{playlist.nickName}}</span></div>
        <div class="create-time">
          <p>创建时间：{{playlist.createTime}}</p>
        </div>
      </div>
      <!-- 相关操作 -->
      <div class="operation">
        <el-button type="primary" icon="el-icon-video-play" @click="playAll">播放全部</el-button>
        <el-button icon="el-icon-share">分享</el-button>
      </div>
      <!-- 歌曲数量 播放量-->
      <div class="song-count">
        <span>歌曲：{{playlist.musicCount}}首</span>
        <span>播放：{{playlist.time}}次</span>
      </div>
      <!-- 歌单简介 -->
      <div class="desc-info">
        <span v-if="playlist.introduction">简介：{{playlist.introduction}}</span>
        <span v-else>简介：暂无简介</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imgUrl:require("../../../assets/img/wyy.png"),
    }
  },
  props:{
    playlist: {
			type: Object,
			default() {
				return {};
			},
		},
  },
  created(){
    // console.log("----------");
    // console.log(this.playlist);
  },
  methods:{
    playAll(){
      this.$emit("playAllSong");
    }
  }
}
</script>

<style lang="less" scoped>
.topDesc{
  padding: 20px 60px 0;
  display: flex;
  align-items: center;
  height: 257px;
  .left-img{
    flex: 1;
    height: 100%;


    img{
      background-color: var(--themeColor);
      width: 237px;
      height: 237px;
    }
  }
  .right-desc{
    flex: 4;
    padding-left: 15px;
    .title{
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
    .creator-info{
      display: flex;
      align-items: center;
      margin-top: 8px;
      .avator{
        width: 6%;
        padding-left: 5px;
        border-radius: 50%;
        img{
          width: 100%;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .name{
        font-size: 16px;
				padding-left: 10px;
				cursor: pointer;
				color: #5091ca;
      }
      .create-time{
        padding-left: 15px;
      }
    }
    .operation{
      margin-top: 8px;
    }
    .song-count{
      margin-top: 8px;
      font-size: 16px;
      span:nth-child(2){
        padding-left: 15px;
      }
    }
    .desc-info{
      font-size: 16px;
			margin-top: 8px;
			overflow: hidden;
			text-overflow: ellipsis;
    }
  }
}

</style>
