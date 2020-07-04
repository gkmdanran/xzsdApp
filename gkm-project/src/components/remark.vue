<template>
  <div class="remark">
    <div class="top">评价
      <img src="../img/greyback.png" alt="" class="arror" @click="toOrder()">
    </div>
    <div class="mains">
        <img :src="image" alt="">
        <van-rate
          v-model="commentStars"
          :size="20"
          color="#ffcc01"
          void-icon="star"
          void-color="#eee"/>
    </div>
    <div class="txt">
      分享你的使用体验吧
    </div>
    <div class="remarkcont">
      <textarea placeholder="请输入您的评价" v-model="remarkContents"></textarea>
    </div>
    <button @click="submitRemark()">提交</button>
  </div>
</template>

<script>
export default {
  name: 'remark',
  data () {
    return {
      commentStars:5,
      remarkContents:'',
      image:''
    }
  },
  methods:{
    async submitRemark(){
      if(this.remarkContents=='')
      this.remarkContents='该用户未作出评价，默认好评！'
      var comment={
        "commentTxt": this.remarkContents,   
        "skuNo": this.$route.query.skuno,
        "star": this.commentStars,
        "orderDetailCode":this.$route.query.dt
      }
      const {data:res}=await this.$http.post("comment/addcomment",comment)
      // console.log(res)
      if(res.code!==200)
        return  this.$toast({
            message: '评论失败',
            icon: 'fail',
            duration:600
          });
      this.remarkContents=''
      this.$toast({
            message: '评论成功',
            icon: 'success',
            duration:600
          });
      this.toOrder()
    },
    toOrder(){
     this.$router.go(-1)
    }
  },
  async created(){
    const {data:res}=await this.$http.get("goods/selectall?status=3&skuNo="+this.$route.query.skuno)
    
    this.image=res.data[0].surPicUrl.split(" ")[0]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.remark {
    position: relative;
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
    text-align: center;
    padding: 0 2rem;
    padding-top: 2.5rem;
    z-index: 1;
  }
  .arror {
    float: left;
    width: 2.6rem;
    height: 2.6rem;
    margin-top: 0.2rem;
  }
  .mains {
    width: 35.9rem;
    height: 14rem;
    background-color: #ffff;
    border-radius: 0.8rem;
    margin: 7.4rem auto;
    padding: 1rem 2rem;
    margin-bottom: 0;
  }
  .mains img {
    float: left;
    width: 12rem;
    height: 12rem;
    margin-right: 2rem;
  }
  .mains .van-rate {
    margin-top: 2rem;
    
  }
  .txt {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    padding-left: 2rem;
    font-size: 1.4rem;
    color: #5a5a5a;
  }
  .remarkcont {
    width: 35.9rem;
    height: 25rem;
    background-color: #ffff;
    border-radius: 0.8rem;
    margin: 0 auto;
    overflow: hidden;
  }
  .remarkcont textarea {
    width: 100%;
    height: 100%;
    resize: none;
    border: 0;
    padding: 2rem;
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #5a5a5a;
  }
  textarea::placeholder {
  color: #dddddd;
  font-size: 1.4rem;
}
   button {
     position: absolute;
     left: 50%;
     transform: translateX(-50%);
     width: 25.2rem;
     height: 4.5rem;
     border-radius: 1rem;
     top: 57rem;
     background: linear-gradient(left,#e8c190,#c79d67);
     font-size: 2.4rem;
     color: #ffffff;
     margin-bottom: 2rem;
   }
</style>
