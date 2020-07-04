<template>
  <div class="homes">
    <div class="top">
      首页
    </div>
    <div class="contents">
        <div class="banner">
          <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
            <van-swipe-item v-for="x in bannerImgs" :key="x.bannerCode">
              <img :src="x.imageUrl" alt="">
            </van-swipe-item>          
          </van-swipe>
        </div>
        <div class="booklists" >
          <div class="booktitle">热门商品</div>
          <div class="bookcontent">
            <div class="books" v-for="y in goodsList" :key="y.skuNo" @click="toBookDetail(y.skuNo)">
              <img :src="y.imageUrl" alt="">
              <div class="txt" v-text="y.skuName+'('+y.detail+')'"></div>
              <div class="price">
                  ￥<span class="now" v-text="y.sellingPrice.toFixed(2)"></span>
                  <span class="pre"><del v-text="'￥'+y.fixPrice.toFixed(2)"></del></span>
              </div>
            </div>
          </div>
        </div>
        
    </div>
  </div>
</template>

<script>
export default {
  name: 'homes',
  data () {
    return {
      bannerImgs:[],
      goodsList:[]
    }
  },
  methods:{
    getHomeList:async function(){  
        const {data:resimg}=await this.$http.get("banner/selectbanner",{params:{status:3}})
        // console.log(resimg)    
        var date=new Date()       
        this.bannerImgs=resimg.rows.filter(x=>{
          return x.status==1&&(new Date(x.startTime).valueOf()<=date.valueOf())&&(new Date(x.overTime).valueOf()>=date.valueOf())
        })
        const {data:res}=await this.$http.post("hot/selecthot")
        // console.log(res)
        for(let x of res.rows){
          x.imageUrl= x.imageUrl.split(" ")[0]
        }
        this.goodsList=res.rows   
    },
    toBookDetail:function(val){
       this.$router.push({
        'path':'/bookdetail',
        query:{
          id:val
        }
      })
    }
  },
  created:function(){
   this.getHomeList()
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .homes {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .top {
    width: 100%;
    height:6.4rem;
    position: fixed;
    top: 0;
    font-size: 2.4rem;
    color: #c39862;
    text-align: center;
    padding-top: 2.5rem;
  }
  .contents {
    width: 100%;
    height: calc(100% - 11rem);
    background-color: #f6f6f6;
    margin-top: 6.4rem;
    overflow: auto;
  }
  .banner {
    width: 35.9rem;
    height: 16.4rem;
    margin: 0 auto;
    border-radius: 0.8rem;
    overflow: hidden;
  }
  .banner .my-swipe{
    width: 100%;
    height: 100%;
  }
  
  .banner img{
    width: 100%;
    height: 100%;
  }
  .booklists {
    width: 35.9rem;
    margin: 0 auto;
    margin-top: 1.2rem;
  }
  .booktitle {
    width: 100%;
    height: 2rem;
    padding-left: 0.7rem;
    line-height: 2rem;
    font-size: 1.4rem;
    color: #c39862;
  }
  .bookcontent {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .books {
    margin-top: 1rem;
    width: 17.5rem;
    height: 20rem;
    background: white;
    border-radius: 0.5rem;
  }
  .books img {
    display: block;
    width: 13.5rem;
    height: 13.5rem;
    margin: 0 auto;
  }
  .books .txt {
    width: 100%;
    height: 3.4rem;
    line-height: 1.7rem;  
    padding:  0.2rem 0.7rem;
    font-size: 1.1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #606060;
  }
  .books .price {
    width: 100%;
    height: 1.9rem;
    margin-top: 0.4rem;
    padding: 0 0.7rem;
    line-height: 1.9rem;
    color: #f30000;
    font-weight: 700;
    font-size: 0.8rem;
  }
  .price .now {
    font-size: 1.2rem;
  }
  .price .pre{
    font-weight: 400;
    color: #adadad;
    margin-left: 0.6rem;
  }
</style>
<style >

.homes .banner .my-swipe .van-swipe__indicator {
  background-color:#ffffff!important ;
   width: 0.6rem;
   height: 0.6rem;
   opacity: 1;
   margin-right: 1rem;
  }
  .homes .banner .my-swipe .van-swipe__indicator--active{
    background-color:#c39862!important ;
  }
</style>
