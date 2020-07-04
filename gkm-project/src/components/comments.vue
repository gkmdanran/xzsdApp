<template>
<div class="comments">
   <div class="top">
      <img src="../img/greyback.png" alt="" class="arror" @click="backGoods()">
      <div class="nav">
          <span class="small"  @click="backGoods()">商品</span>
          <span class="big">评价</span>
      </div>

    </div>
  <div class="navs">
      <span @click="navClick(1)" :class="{'current':1==currentIndex}">全部评价</span>
      <span @click="navClick(2)" :class="{'current':2==currentIndex}">好评</span>
      <span @click="navClick(3)" :class="{'current':3==currentIndex}">中评</span>
      <span @click="navClick(4)" :class="{'current':4==currentIndex}">差评</span>
    </div>
  <div class="contents">
      <div class="comlists" v-for="x in commentsList" :key="x.id" v-show="showComments(x.star)">
        <div class="title">
          <div class="pic">
            <img src="../img/photo.jpg" alt="">
          </div>
          <div class="names">
              <p v-text="x.userName"></p>
              <span v-text="x.createTime"></span>
          </div>
          <div class="stars">
            <van-icon name="star" v-for="(y,i) in x.star" :key="i" />
          </div>
        </div>
        <div class="txt" v-text="x.commentTxt">
        </div>
      </div>
      <!-- <div class="comlists">
        <div class="title">
          <div class="pic">
            <img src="../img/photo.jpg" alt="">
          </div>
          <div class="names">
              <p>Cvita Bill</p>
              <span>2020-02-23 23:51:49</span>
          </div>
          <div class="stars"><van-icon name="star" /><van-icon name="star" /><van-icon name="star" /><van-icon name="star" /><van-icon name="star" />
          </div>
        </div>
        <div class="txt">
            这本书从封面设计制作的质量和内部用的纸张,大小间距用量整体看属于上等水准,值得购买,五星好评!
        </div>
      </div> -->
      
  </div>
</div>
  
</template>

<script>
export default {
  name: 'comments',
  data () {
    return {
       bookId:'',
       commentsList:[],
       currentIndex:'1',
       currentStars:10
    }
  },
  methods:{
     backGoods:function(){
      this.$router.go(-1)
    },
    async getComList(){
      // var list=[
      //   {
      //     id:'1',
      //     userPhoto:require("../img/photo.jpg"),
      //     userNumber:'bill123',
      //     commentTime:'2020-2-23 23:47:16',
      //     commentContents:'这本书从封面设计制作的质量和内部用的纸张,大小间距用量整体看属于上等水准,值得购买,五星好评!',
      //     commentStars:5
      //   },
      //    {
      //     id:'2',
      //     userPhoto:require("../img/photo.jpg"),
      //     userNumber:'mike123',
      //     commentTime:'2020-3-23 23:47:16',
      //     commentContents:'这本书从封面设计制作的质量和内部用的纸张,大小间距用量整体看属于上等水准,值得购买,五星好评!',
      //     commentStars:4
      //   },
      //       {
      //     id:'3',
      //     userPhoto:require("../img/photo.jpg"),
      //     userNumber:'mike123',
      //     commentTime:'2020-3-23 23:47:16',
      //     commentContents:'这本书从封面设计制作的质量和内部用的纸张,大小间距用量整体看属于上等水准,值得购买,五星好评!',
      //     commentStars:3
      //   },
      //       {
      //     id:'4',
      //     userPhoto:require("../img/photo.jpg"),
      //     userNumber:'mike123',
      //     commentTime:'2020-3-23 23:47:16',
      //     commentContents:'这本书从封面设计制作的质量和内部用的纸张,大小间距用量整体看属于上等水准,值得购买,五星好评!',
      //     commentStars:2
      //   },
      //       {
      //     id:'5',
      //     userPhoto:require("../img/photo.jpg"),
      //     userNumber:'mike123',
      //     commentTime:'2020-3-23 23:47:16',
      //     commentContents:'这本书从封面设计制作的质量和内部用的纸张,大小间距用量整体看属于上等水准,值得购买,五星好评!',
      //     commentStars:1
      //   }
      // ]
      // this.commentsList=list\
      const {data:res}=await this.$http.post("comment/selectcomment",{"skuNo": this.bookId})
      console.log(res)
      this.commentsList=res.data
    },
    navClick(val){
      this.currentIndex=val
      if(val==2){
        this.currentStars=5
      }
      if(val==3){
        this.currentStars=3
      }
      if(val==4){
        this.currentStars=1
      }
    },
    showComments(val){
      if((val-this.currentStars)<=1&&(val-this.currentStars)>=0||this.currentIndex==1){
        return true
      }
      else {
        return false
      }
    }
  },
  created:function(){
     this.bookId=this.$route.query.id
    this.getComList()
   
    console.log(this.bookId)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comments {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #f6f6f6;
  }
   .top {
    background-color: #ffff;
    width: 100%;
    height:6.4rem;
    position: fixed;
    top: 0;
    font-size: 2.4rem;
    color: #c39862;
    padding: 0 2rem;
    padding-top: 2.5rem;
    
  }
  .arror {
    float: left;
    width: 2.6rem;
    height: 2.6rem;
    margin-top: 0.2rem;
  }
  .top .nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 15rem;
    height: 3.2rem;
    line-height: 3.2rem;
  }
  .nav .small {
    
    color: #adadad;
    font-size: 2.2rem;
  }
   .nav .big {
     float: right;
   }
   .navs{
    position: fixed;
    top: 6.4rem;
    width: 100%;
    height: 6.3rem;
    line-height: 6.3rem;
    padding-left: 2rem;
    font-size: 1.4rem;
    color: #5a5a5a;
  }
  .navs span {
    margin-right: 2.1rem;
  }
  .navs .current {
    color: #c39862;
  }
  .contents {
      overflow: auto;
      width:35.9rem;
      height: calc(100% - 16.8rem);
      margin: 0 auto ;
      margin-top: 12.7rem;
      background-color: #ffff;
      border-radius: 0.8rem;
      
  }
  .comlists {
   width: 100%;
   margin-top: 2.5rem;
  }
  .comlists .title {
    width: 100%;
    height: 3rem;
    padding-left: 1.2rem;
    padding-right: 1.3rem;
  }
  .title .pic {
    float: left;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1.1rem;
  }
  .pic img {
    width: 100%;
    height: 100%;
  }
  .names {
    float: left;
    width: 11.5rem;
    height: 3rem;

    font-size: 1.2rem;
    line-height: 1.8rem;
    color: #5a5a5a;
    
  }
   .names span {
     display: block;
     line-height: 1.2rem;
     font-size: 0.8rem;
     color: #6f6f6f;
   }
   .stars {
     width: 6.6rem;
     height: 1rem;
     float: right;
     margin-top: 1rem;
   }
   .stars .van-icon {
     color: #ffcc01;
     font-size: 1rem;
     margin-right: 0.3rem;
     float: right;
   }
   .txt {
     width: 100%;
     padding: 0.9rem;
     padding-left: 5.3rem;
     padding-right: 1.3rem;
     font-size: 1.3rem;
     line-height: 1.8rem;
     color: #5a5a5a;
   }
</style>
