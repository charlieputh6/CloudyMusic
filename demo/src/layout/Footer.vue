<template>
<div id="footer">
  <div class="player">

    <div class="left-cover-content">
      <div class="cover-content">
        <div class="cover">
            <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle"></use>
          </svg>

        </div>
        <div class="songname">
          <p>歌曲名称</p>
        </div>
      </div>
    </div>

    <div class="center-play-song">
      <div class="change-play">

      </div>
      <div class="song-progress"></div>
      <div class="playmodel"></div>
    </div>

    <div class="right-voice"></div>
  </div>

</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
#footer {
	width: 100%;
	position: fixed;
	bottom: 0px;
	height: 70px;
	z-index: 999;
	background: #f8f8ff;
	border-top: 1px solid #dddddd;
}
.player {
	display: flex;
	align-items: center;
	height: 100%;
	width: 98%;
	margin: 0 auto;
  .left-cover-content{
    display: flex;
    width: 15%;
    background-color: skyblue;
    .cover-content{
      display: flex;
      align-items: center;
      .cover{
         display: flex;
         svg{
           font-size: 34px;
         }
      }
      .songname {
				margin-left: 35px;
				p {
					width: 100px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
    }

  }
  .center-play-song{
    display: flex;
    flex: 1;
    background-color: pink;
  }
  .right-voice{
    width: 15%;
    display: flex;
    background-color: yellow;
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
