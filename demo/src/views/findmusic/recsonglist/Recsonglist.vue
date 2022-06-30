<template>
  <div id="recong-list">
    <!--歌单介绍信息-->
    <div class="top-song-list">
      <div class="image">
        <img :src="imgUrl" alt="歌单封面">
      </div>
      <div class="info">
        <div class="hd">
          <el-divider content-position="left"><h2>精品歌单</h2></el-divider>
        </div>
        <div class="title">
          华语｜难以被复制的歌单推荐
        </div>
        <div class="desc">
           当耳熟于心的欧美热单遇上高贵典雅的管弦乐器会有什么奇异火花呢？

乐器演奏家们将流行乐进行二次编曲演奏，使之焕发出新的生命力和创造力，似乎成为了这些乐器音乐家的家常便饭和趣味性，造就了这些流行乐即便不需要人声和歌词照样有直击心脏的力量，带来全新惊艳耳朵的饕餮盛宴。

细数那些用流行乐演奏的唯美纯音。来一场流行乐与管弦乐器的浪漫邂逅，只为再次抓住你挑剔的耳朵。

几位比较喜爱的乐器演奏家：

The Piano Guys（钢琴男团）

作为Neo-classical目前的代表性乐团之一，初衷是创造出能够激励人们的音乐和视频，想将自己的音乐带给这个世界。The Piano Guys改编的古典音乐融合自然、过渡流畅，MV拍摄优美大气、富于想象力。他们推出的音乐视频制作巧妙，画面优美很适合边听边看。他们常常为了达到最唯美震撼的效果到不同地方取景，甚至把钢琴搬到一些意想不到的地方，让乐迷惊叹不已。

David Garrett（大卫·格瑞特）

德国/美国混血的音乐神童。在青少年时期就写下连篇传奇故事。成年后更化身庞克型男，以他基础坚实的小提琴技法，重新定义流行音乐的提琴王子，2008年，以1分6.56秒精准演奏完“野蜂飞舞”，打破了吉尼斯世界纪录，成为“全世界速度最快的小提琴手”!梅纽因在世时，曾夸赞他的琴艺“非比寻常的精彩”，而BBC也赞美他“已经是个传奇”。

Gheorghe Zamfir（格奥尔基·赞菲尔）

格奥尔基·赞菲尔毫无疑问是世界最著名的排箫大师之一。他的多张优秀专辑也使他在二十世纪后期名声大噪。格奥尔基是二十世纪将排箫重新介绍到音乐厅和唱片中的重要提倡者，在排箫吹奏上，至今依然没有人能超过他的地位，任何民间乐器假如能风靡世界，除开天赐良机，一定还和一些伟大的音乐家的努力分不开关系。

kenny G（肯尼·基）

美国著名萨克斯管演奏家、音乐家。出道以来，总计创造了九张称霸全美当代爵士榜冠军并打进流行专辑榜 TOP10 的专辑，拥有24首抒情榜 TOP40 单曲，历年的专辑、单曲、音乐录影带的累积销售也已冲破7500万张，他是流行音乐史上最畅销的演奏曲艺人，同时也是当代最畅销的流行音乐乐手。他的非凡才华为他赢得了格莱美奖、全美音乐奖、灵魂列车奖与世界音乐奖。
        </div>
      </div>
    </div>


    <!-- 歌单列表 -->
    <div class="song-list">
      <SongList :songlist="songlist"></SongList>
    </div>
  </div>
</template>

<script>
import SongList from "./SongList.vue";
export default {
    data() {
      return {
        imgUrl: require("../../../assets/img/list.jpg"), //顶部封面
        songlist:[],
        song:{}
      }
    },
    created(){
      this.getRecommendList();
    },
    methods:{
      async getRecommendList(){
        const { data: res } = await this.$http.get("/list/getrecommendlist");
        this.songlist = res.data
      }
    },
    components: { SongList }
}
</script>

<style lang="less" scoped>
.top-song-list{
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .image{
    width: 16%;
    background-color: var(--themeColor);
    img{
      width: 100%;
    }
  }
  .info{
    width: 80%;
    .title{
      font-size: 16px;
      padding-bottom: 5px;
    }
    .desc{
      height: 110px;
      font-size: 12px;
			color: #909399;
			overflow-y: scroll;
    }
  }
}
.song-list{
  margin-top: 20px;
  padding: 0 60px;
}
</style>
