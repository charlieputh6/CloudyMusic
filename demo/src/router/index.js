import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 1 发现音乐 */
const Findmusic = () => import("../views/findmusic/FindMusic.vue");
// 1.1 个性推荐
const Discover = () => import("../views/findmusic/discover/Discover.vue");
// 1.2 推荐歌单
const Recsonglist = () => import("../views/findmusic/recsonglist/Recsonglist.vue");
// 1.3 排行榜
const Songrank = () => import("../views/findmusic/songrank/Songrank.vue");
// 1.4 歌手
const Singer = () => import("../views/findmusic/singer/Singer.vue");
// 1.5 最新音乐
const Newsongs = () => import("../views/findmusic/newsongs/Newsongs.vue");

// 1.6 歌单详情
const Songlistdetail = () => import("../views/songlistdetail/Songlistdetail.vue");

/* 2 推荐视频 */
const Recvideo = () => import("../views/recvideo/RecVideo.vue");


/* 3 每日推荐 */
const Receveryday = () => import("../views/receveryday/RecEveryDay.vue");

/* 4 我的收藏 */
const Myfavorite = () => import("../views/myfavorite/MyFavorite.vue");

/* 5 我喜欢的音乐 */
const Mylove = () => import("../views/mylove/MyLove.vue");

// 6 搜索详情页

const Searchdetail = () => import("../views/searchdetail/Searchdetail.vue");
const SongRes = () => import("../views/searchdetail/Childcomps/SongRes.vue");
const AlbumRes = () => import("../views/searchdetail/Childcomps/AlbumRes.vue");
const SingerRes = () => import("../views/searchdetail/Childcomps/SingerRes.vue");

export default new Router({
  mode: "hash",
  routes: [
    {
      path: '/',
      redirect: "/findmusic"
    },
    {
      path: "/findmusic",
      component: Findmusic,
      name: "Findmusic",
      redirect: "/findmusic/discover",
      children: [
        {
          path: "discover",
          name: "Discover",
          component: Discover,
        },
        {
          path: "recsonglist",
          name: "Recsonglist",
          component: Recsonglist,
        },
        {
          path: "songrank",
          name: "Songrank",
          component: Songrank,
        },
        {
          path: "singer",
          name: "Singer",
          component: Singer,
        },
        {
          path: "newsongs",
          name: "Newsongs",
          component: Newsongs,
        },
      ],
    },
    {
      path: "/recvideo",
      component: Recvideo,
      name: "Recvideo",
    },
    {
      path: "/receveryday",
      component: Receveryday,
      name: "Receveryday",
    },
    {
      path: "/myfavorite",
      component: Myfavorite,
      name: "Myfavorite",
    },
    {
      path: "/mylove",
      component: Mylove,
      name: "Mylove",
    },
    // 歌单详情
    {
      path: "/songlistdetail/:id",
      name: "Songlistdetail",
      component: Songlistdetail,
    },
    /* 搜索详情*/
    {
      path: "/searchdetail/:keywords",
      component: Searchdetail,
      redirect: "/searchdetail/songres/:keywords",
      children: [
        {
          path: "/searchdetail/songres/:keywords",
          name: "SongRes",
          component: SongRes,
        },
        {
          path: "/searchdetail/albumres/:keywords",
          name: "AlbumRes",
          component: AlbumRes,
        },
        {
          path: "/searchdetail/singerres/:keywords",
          name: "SingerRes",
          component: SingerRes,
        },
      ],
    },
  ]
})
