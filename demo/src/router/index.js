import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 1 发现音乐 */
const Findmusic = () => import("../views/findmusic/FindMusic.vue");
// 1.1 个性推荐
const Discover = () => import("../views/findmusic/discover/Discover.vue");


/* 2 推荐视频 */
const Recvideo = () => import("../views/recvideo/RecVideo.vue");


/* 3 每日推荐 */
const Receveryday = () => import("../views/receveryday/RecEveryDay.vue");

/* 4 我的收藏 */
const Myfavorite = () => import("../views/myfavorite/MyFavorite.vue");

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
      ]
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
  ]
})
