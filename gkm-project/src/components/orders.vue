<template>
  <div class="orders">
   <div class="top">我的订单
      <img src="../img/greyback.png" alt="" class="arror" @click="toMine()">
    </div>
    <div class="navs">
      <span @click="navClick(1,$event)" :class="{'current':1==currentnavs}">全部订单</span>
      <span @click="navClick(2,$event)" :class="{'current':2==currentnavs}">已付款</span>
      <span @click="navClick(3,$event)" :class="{'current':3==currentnavs}">待取货</span>
      <span @click="navClick(4,$event)" :class="{'current':4==currentnavs}">已完成</span>
    </div>
    <div class="contents">
      <div class="order" v-for="x in orderlist" :key="x.id" v-show="status(x.status)==targetTxt||1==currentnavs">
        <div class="head">         
            <img src="../img/order.png" alt="">
            <span class="number" v-text="x.number"></span>
            <span class="status">{{status(x.status)}}</span>
        </div>
        <div class="body" v-for="(y,i) in x.details" :key="i"  @click="toOrderdetails(y.dtCode,x.status,y.storeNo)">
          <img :src="y.img" alt="">
          <div class="details">
            <div class="txt" v-text="y.adv"></div>
            <div class="infos" v-text="'作者：'+y.author"></div>
            <div class="price">
              <span class="count" v-text="'×'+y.count"></span>
              <div class="dj">￥<span v-text="(y.price).toFixed(2)"></span></div>
            </div>
          </div>
        </div>
        
        <div class="foot">
          共<i v-text="x.count"></i>件商品，合计 ￥<span v-text="(x.price-0).toFixed(2)"></span>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orders',
  data () {
    return {
      orderlist:[],    //调用接口
      currentnavs:1,
      targetTxt:'',
      bkUserId:'',
      details:[],
      goodsInfo:[]
    }
  },
  methods:{
    toMine:function(){
      this.$router.push({
        'path':'/mine'
      })
    },
    getOrderList:async function(){
      const {data:res}=await this.$http.get("order/selectorder?orderStatus=10&userCode="+this.bkUserId)
      
      var list=[]
      for(let x of res.rows){
        await this.getDetailList(x.orderNo)    
        var detailList=[]
        var counts=0
        for(let y of this.details){
          // console.log(y)
          await this.getGoodsInfo(y.skuNo)
          // console.log(this.goodsInfo[0])
          var detail={
            img:this.goodsInfo[0].surPicUrl.split(" ")[0],
            skuName:this.goodsInfo[0].skuName,
            author:this.goodsInfo[0].author,
            det:this.goodsInfo[0].detail,
            adv:this.goodsInfo[0].advertising,
            price:this.goodsInfo[0].sellingPrice,
            count:y.goodsCnt,
            dtCode:y.orderDetailCode,
            storeNo:this.goodsInfo[0].outsideNo
          }
          detailList.push(detail)
          counts+=y.goodsCnt
        }
        var order={
          id:x.id,
          number:x.orderNo,
          status:x.orderStatus,
          count:counts,
          price:x.orderMoney,
          details:detailList
        }
        list.push(order)
      }
      this.orderlist=list
      // console.log(this.orderlist)
    },
    async getDetailList(val){
      const {data:res}=await this.$http.post("order/selectdetails",{orderNo:val})
      this.details=res.data
    
    },
    async getGoodsInfo(val){
      const {data:res}=await this.$http.get("goods/selectall?status=3&skuNo="+val)
      this.goodsInfo=res.data
    },
    navClick:function(val){
      this.currentnavs=val
      this.targetTxt=event.target.innerText     
    },
    
    toOrderdetails:function(val,status,storeNo){
      this.$router.push({
        'path':'/orderdetails',
        query:{
          dt:val,
          st:status,
          stno:storeNo
        }
      })
      console.log(val)
    },
    async getLoginInfo(){
        var {data:res}=await this.$http.get("common/getLoginInfo")
        this.bkUserId=res.user.userId
        console.log(this.bkUserId)
      }

  },
  computed:{
    status(val){
      
      return (val)=>{
        var text
        if(val==0){
          text="已付款"
        }
        if(val==1||val==5){
          text="已完成"
        }
        if(val==3||val==4||val==6){
          text="待取货"
        }
        return text
      }
    }
  },
  created:function(){
     this.getLoginInfo()
     this.getOrderList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orders {
    width: 100%;
    height: 100%;
    overflow: hidden;
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
    
  }
  .arror {
    float: left;
    width: 2.6rem;
    height: 2.6rem;
    margin-top: 0.2rem;
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
    margin-right: 2.5rem;
  }
  .navs .current {
    color: #c39862;
  }
  
  .contents {
    overflow: auto;
    width: 100%;
    height: calc(100% - 12.7rem);
    margin-top: 12.7rem;
  }
  .order { 
    width: 35.9rem;
    height: auto;
    background-color: #ffff;
    border-radius: 0.8rem;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  .order .head {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    padding: 0 1.2rem;
  }
  .head img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    margin-top: -0.5rem;
  }
  .head .number {
    font-size: 1.3rem;
  }
  .head .status {
    float: right;
    font-size: 1.1rem;
    color: #c39862;
  }
  .order .body {
    width: 100%;
    height: 8.3rem;
    padding-left: 3.2rem;
    padding-right: 1rem;
    margin-bottom: 1rem;
  }
  .body img {
    width: 8.3rem;
    height: 8.3rem;
    border-radius: 0.3rem;
  }
  .body .details {
    width: 22.7rem;
    height: 100%;
    float: right;
  }
  .details .txt {
    width: 100%;
    height: 3.9rem;
    line-height: 1.9rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 1.2rem;
    color: #5a5a5a;
  }
  .details .infos {
    width: 100%;
    height: 1.7rem;

    font-size: 1rem;
    line-height: 1.7rem;
    color: #aeaeae;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .details .price {
    width: 100%;
    height: 1.9rem;
    margin-top: 0.8rem;

    line-height: 1.9rem;
    
  }
  .price .count{
    float: right;
    font-size: 0.8rem;
    color: #b6b6b6;
    margin-left: 0.6rem;
    font-weight: 700;
  }
  .price .dj {
    font-size: 0.8rem;
    color: #f30303;
    font-weight: 700;
    float: right;
  }
  .dj span {
    font-size: 1.2rem;
  }
  .order .foot {
    width: 100%;
    height: 5.5rem;
    line-height: 5.5rem;
    font-size: 1.2rem;
    color: #5a5a5a;
    padding-right: 1rem;
    text-align: right;
  }
  .foot span {
    font-size: 1.5rem;
  }
  .comment {
    width: 100%;
    height: 3.9rem;
    padding-right:1rem ;
  }
  .comment button {
    width: 7.4rem;
    height: 2.5rem;
    border: 0.1rem solid #c39862;
    border-radius: 1.25rem;
    background-color: #ffffff;
    color: #c39862;
    float: right;
    font-size: 1.3rem;
  }
</style>
