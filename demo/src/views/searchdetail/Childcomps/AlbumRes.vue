<template>
  <div>
    <!-- <Albumlist :albumlist="albumlist"/> -->
  </div>
</template>

<script>
export default {
    components: {  },
    data(){
      return{
        albumlist:[],
        keywords:""
      }
    },
    created(){
      this.keywords = this.$route.params.keywords;
      this.getSonglist();
    },
    methods:{
      async getSonglist(){
        const { data: res } = await this.$http.get("/album/searchalbum", {params:{name:this.keywords}});
        this.albumlist = res.data;
      }
    }
}
</script>

<style>

</style>
