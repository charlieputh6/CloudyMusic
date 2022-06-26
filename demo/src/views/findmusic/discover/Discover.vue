<template>
  <div>
    <Banner :banner="banner" />
  </div>
</template>

<script>
import Banner from './Childcomps/Banner.vue';
export default {
    components: { Banner },
    data(){
      return{
        //轮播图数据
        banner:[
          {
            imgSrc:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F2572e2fc8ec956e327864fce152a4962207304601b3d4-PWEL2E_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657454790&t=8f4a2ed069f5339031cf7f8ff8c84ca8",

          },
          {
            imgSrc:"https://img0.baidu.com/it/u=3224520707,3745661905&fm=253&fmt=auto&app=138&f=PNG?w=1196&h=5000"
          },
          {
            imgSrc:"https://img2.baidu.com/it/u=1189797366,4032328188&fm=253&fmt=auto&app=138&f=PNG?w=634&h=240"
          }
        ],
      }
    }
}
</script>

<style lang="less" scoped>

</style>
