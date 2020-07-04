<template>
  <div class="bookdetail">
    <div class="top">
      <img src="../img/greyback.png" alt="" class="arror" @click="backBefore()">
      <div class="nav">
          <span>商品</span>
          <span class="small" @click="toComments()">评价</span>
      </div>
      
    </div>
    <div class="banner" >
       
        <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
            <van-swipe-item v-for="(x,i) in bookdetlist.surPicUrl" :key="i">
              <img :src="x" alt="">
            </van-swipe-item>               
        </van-swipe>
    </div>
    <div class="infos">
      <div class="price">
        ￥<span class="now" v-text="bookdetlist.sellingPrice"></span>
        <del  v-text="'￥'+bookdetlist.fixPrice"></del>
      </div>
      <div class="txt" v-text="'《'+bookdetlist.skuName+'》是由著名作家'+bookdetlist.author+'编写 ('+bookdetlist.advertising+')'"></div>
      <div class="countadd">
        <div class="lists">
          数量
          <div class="count">
              <div class="minus" @click="numMinus()">-</div>
              <input type="number" disabled=true v-model="num">
              <div class="plus" @click="numPlus()">+</div>
            </div>
        </div>
         <div class="lists">
          送至<img src="../img/address.png" alt="">
          <span>新华书店（新街口店）</span>
        </div>
        <div class="lists">
          收货人<input type="text" class="shippinguser" v-model="shippinguser">
        </div>
      </div>
    </div>
    <div class="bottom">
      <button class="buy" @click="buyBook()">立即购买</button>
      <button class="addcar" @click="addShopCar()">加入购物车</button>
      <div class="icon iconfont" @click="toShopCar()">
        &#xe60c;
        <p>购物车</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookdetail',
  data () {
    return {
      num:1,
      bookdetlist:[],
      bookId:'',
      districtMoney:0,
      shippinguser:''
    }
  },
  methods:{
    getBookDetList:async function(){
        const {data:res}=await this.$http.get("goods/selectgoods",{params:{skuNo:this.bookId,status:3}})
        // console.log(res)
        var imgs=res.rows[0].surPicUrl.split(' ')
        if(imgs.length==4){
          imgs.splice(0,1)
        }
        res.rows[0].surPicUrl=imgs
        this.bookdetlist=res.rows[0]
        // console.log(this.bookdetlist.outsideNo)
    },
    backBefore:function(){
      this.$router.go(-1)
    },
    numMinus:function(){
      this.num--
      if(this.num<=1){
        this.num=1
      }
    },
    numPlus:function(){
      this.num++
      if(this.num>=99){
        this.num=99
      }
    },
    toShopCar:function(){
      this.$router.push({
        'path':'/shopcar',
      })
    },
     toComments:function(){
      this.$router.push({
        'path':'/comments',
        query:{
          id:this.bookId
        }
      })
    },
    addShopCar:async function(){
      var car={
        "cnt": this.num,
        "skuNo": this.$route.query.id,
        "storeNo":this.bookdetlist.outsideNo
      }
      const {data:res}=await this.$http.post("car/addcar",car)
      if(res.code!==200)
        return  this.$toast({
            message: '添加购物车失败',
            icon: 'fail',
            duration:600
          });
     this.$toast({
            message: '添加购物车成功',
            icon: 'success',
            duration:600
          });
      this.num=1
    },
    async buyBook(){
      var order=[
        {
          "districtMoney": this.districtMoney,
          "orderDetails": [
            {
              "goodsCnt": this.num,
              "goodsName": this.bookdetlist.skuName,
              "goodsPrice": this.bookdetlist.sellingPrice,
              "skuNo": this.bookdetlist.skuNo,
            }
          ],
          "shippingUser": this.shippinguser,
          "storeName": this.bookdetlist.storeName,
          "storeNo": this.bookdetlist.outsideNo,
        }
      ]
      if(this.shippinguser.trim()=='')
      return  this.$toast({
            message: '请输收货人姓名',
            icon: 'fail',
            duration:600
          });
          // console.log(order)
      const{data:res}=await this.$http.post("order/insertorder",order)
      
      if(res.code!==200)
        return this.$toast({
            message: '购买失败',
            icon: 'fail',
            duration:600
          });
       this.$toast({
            message: '购买成功',
            icon: 'success',
            duration:600
          });
       this.$router.push({
            'path':'/orders'
          })
    }
    
    
  },
  created:function(){
    this.bookId=this.$route.query.id
    // console.log(this.bookId)
    this.getBookDetList()
    console.log(this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bookdetail {
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
    z-index: 1;
    
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
    float: right;
    color: #adadad;
    font-size: 2.2rem;
  }
  .banner {
    width: 35.9rem;
    height: 28.4rem;
    border-radius: 0.8rem;
    background-color: #ffff;
    margin: 0 auto;
    margin-top: 7.5rem;
    overflow: hidden;
  }
  .banner .my-swipe{
    width: 100%;
    height: 100%;
  }
  .banner img {
    display: block;
    width: 23.5rem;
    height: 23.5rem;
    margin: 0 auto;
    margin-top: 1.7rem;
  }
  .infos {
     width: 35.9rem;
     height: 19.9rem;
     margin: 1rem auto;
     margin-bottom: 6rem;
     background-color: #ffff;
     border-radius: 0.8rem;
     padding: 0 1.2rem;
     padding-top: 0.9rem;
  }
  .infos .price {
    width: 100%;
    height: 3.7rem;
    line-height: 3.7rem;
    font-size: 1.2rem;
    color: #f30000;
    font-weight: 700;
  }
  .price .now {
    font-size: 1.6rem;
  }
  .price del {
    font-size: 0.8rem;
    color: #aeaeae;
    font-weight: 400;
    margin-left: 0.2rem;
  }
  .txt {
    width: 100%;
    height: 3.4rem;
    line-height: 1.7rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size:1.2rem;
    color: #5a5a5a;
  }
  .countadd {
    width: 100%;
    height: 6rem;
    border-top: 0.1rem solid #d8d8d8;
    margin-top: 1rem;
    padding-top: 0.5rem;
    line-height: 3.3rem;
  }
  .countadd .lists {
    font-size: 1.2rem;
    color: #5a5a5a;
  }
  .lists img {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 1.4rem;
    margin-top: -0.4rem;
    margin-right: 0.5rem;
  }
  .lists span {
    color:#adadad;
  }
  .count {
    width: 7.4rem;
    height: 1.8rem;
    float: right;
    border: 0.1rem solid  #d8d8d8;
    border-radius: 0.3rem;
    position: relative;
    margin-top: 0.75rem;
  }
    .count .minus,
  .count .plus {
    width: 2.1rem;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    position: absolute;
    top: 0;
    font-size: 1.2rem;
    font-weight: 400;
    color: #5a5a5a;
  }
  .count .minus {
    left: 0;
  }
  .count .plus {
    right: 0;
  }
  .count input{
    margin: 0;
    position: absolute;
    top: -0.1rem;
    right: 2.1rem;
    width: 3rem;
    height: 1.8rem;
    border: 0.1rem solid #d8d8d8;
  }
  .count input {
    text-align: center;
    font-size:1.2rem
  }
  .bottom {
    width: 100%;
    background-color: #ffff;
    height: 4.7rem;
    border-top: 0.1rem solid #cccccc;
    position: fixed;
    bottom: 0;
    padding-right: 0.8rem;
  }
  .bottom .buy {
    width: 9.6rem;
    height: 3.4rem;
    float: right;
    margin-top: 0.6rem;
    border-radius:0.8rem;
    background: linear-gradient(left,#e4bd8b,#cba16c);
    color: #ffff;
    font-size: 1.4rem;
  }
  .bottom .addcar {
     width: 9.6rem;
    height: 3.4rem;
    float: right;
    margin-top: 0.6rem;
    border-radius:0.8rem;
    font-size: 1.4rem;
    border: 0.1rem solid #c39862;
    margin-right: 1.2rem;
    background-color: #ffffff;
    color: #c39862;
  }
  .icon {
    padding-top: 0.5rem;
    width: 3rem;
    height: 4.1rem;

    float: right;
    margin-right: 1rem;
    text-align: center;
    font-size: 2.4rem;
    color: #5a5a5a;
  }
  .icon p{
    font-size: 0.8rem;
    
  }
  .shippinguser{
    margin-left: 1rem;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    height: 2.5rem;
    width: 12rem;
    padding: 0 1rem;
  }
</style>
<style >

.bookdetail .banner .my-swipe .van-swipe__indicator {
  background-color:#e9e9e9!important ;
   width: 0.6rem;
   height: 0.6rem;
   opacity: 1;
   margin-right: 1rem;
  }
  .bookdetail .banner .my-swipe .van-swipe__indicator--active{
    background-color:#c39862!important ;
  }
</style>
