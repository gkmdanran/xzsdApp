<template>
  <div class="bottom">
    <div class="icons iconfont" :class="{selected:currentpath=='homes'}"  @click="toOthers('homes')" >&#xe60b;<p>首页</p></div>
    <div class="icons iconfont" :class="{selected:currentpath=='kinds'}" @click="toOthers('kinds')" >&#xe60d;<p>分类</p></div>
    <div class="icons iconfont" :class="{selected:currentpath=='shopcar'}" @click="toOthers('shopcar')" >&#xe60c;<p>购物车</p></div>
    <div class="icons iconfont" :class="{selected:currentpath=='mine'}" @click="toOthers('mine')" >&#xe60a;<p>我的</p></div>
  </div>
</template>

<script>
export default {
  name: 'bottom',
  data () {
    return {
      currentpath:''
    }
  },
  methods:{
    toOthers:function(val){
     
      this.$router.push({
        'path':val
      })
       this.currentpath=val
    }
  },
  mounted:function(){
    this.currentpath=this.$route.name
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bottom {
    width: 100%;
    height: 4.6rem;
    border-top: 0.1rem solid #d0d0d0;

    display: flex;
    padding-top: 0.4rem;
  }
  .icons {
    flex: 1;
    text-align: center;
    font-size: 2rem;
    color: #5a5a5a;
  }
  .icons p {
    font-size: 1rem;
    margin-top: 0.4rem;
  }
  .selected {
    color: #c39862;
  }
</style>
