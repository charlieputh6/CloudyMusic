import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 1 发现音乐 */
const Findmusic = () => import("../views/findmusic/Findmusic.vue");


/* 2 推荐视频 */
const Recvideo = () => import("../views/recvideo/Recvideo.vue");


/* 3 每日推荐 */
const Receveryday = () => import("../views/receveryday/Receveryday.vue");

/* 4 我的收藏 */
const Myfavorite = () => import("../views/myfavorite/Myfavorite.vue");

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
      // redirect: "/findmusic/discover",
    },
    {
      path: "/recvideo",
      component: Recvideo,
      name: "Recvideo",
      // redirect: "/recvideo/mv",
    },
    {
      path: "/receverday",
      component: Receveryday,
      name: "Receveryday",
      // redirect: "/findmusic/discover",
    },
    {
      path: "/myfavorite",
      component: Myfavorite,
      name: "Myfavorite",
      // redirect: "/findmusic/discover",
    },
  ]
})
