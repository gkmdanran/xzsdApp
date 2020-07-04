<template>
  <div class="orderdetails">
   <div class="top">订单详情
      <img src="../img/greyback.png" alt="" class="arror" @click="toOrder()">
    </div>
    <div class="contents" >
      <div class="title">
        <div class="address">
          <img src="../img/car.png" alt="">
          寄货门店: <span v-text="storeName"></span>
        </div>
         <div class="address">
          <img src="../img/address.png" alt="">
          取货门店: <span v-text="'新华书店（新街口店）'"></span>
        </div>
      </div>
      <div class="main">
        <div class="body">
          <img :src="image" alt="">
          <div class="details">
            <div class="txt" v-text="goodsInfo.advertising"></div>
            <div class="infos" v-text="'作者：'+goodsInfo.author"></div>
            <div class="price">
              <span class="count" v-text="'×'+count"></span>
              <div class="dj">￥<span  v-text="(price-0).toFixed(2)"></span></div>
            </div>
          </div>
        </div>
        <div class="foot">
          共<i v-text="count"></i>件商品，合计 ￥<span  v-text="(count*price).toFixed(2)"></span>
        </div>
      </div>
    </div>
    <div class="odinfos" >
      <div class="ordertitle">订单信息</div>
      <div class="orderinfos">订单编号:
        <span>{{dtCode}}</span>
      </div>
      <div class="orderinfos">创建时间:
        <span v-text="timer"></span>
      </div>
      <div class="orderinfos">订单状态:
        <span class="status">{{getStatus(status)}}</span>
      </div>
      <div class="comment" v-show="(status==5||status==1)&&isAppraise==0">
          <button @click.stop="toComment(skuNo,dtCode)">评价</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderdetails',
  data () {
    return {
      image:'',
      status:'',
      isAppraise:0,
      dtCode:'',
      storeNo:'',
      oderdetail:[],
      storeName:'',
      timer:'',
      count:'',
      price:'',
      goodsInfo:[],
      skuNo:''
    }
  },
  methods:{
    toOrder:function(){
       this.$router.push({
        'path':'/orders'
      })
    },
    getOrderDetail:async function(){      
       const {data:res}=await this.$http.post("order/selectdetails",{orderDetailCode:this.dtCode})
       this.isAppraise=res.data[0].isAppraise
       this.timer=res.data[0].createTime
       this.count=res.data[0].goodsCnt
       this.price=res.data[0].goodsPrice
       this.skuNo=res.data[0].skuNo
       this.getGoodsInfo(res.data[0].skuNo)
    },
    async getGoodsInfo(val){
      const {data:res}=await this.$http.get("goods/selectall?status=3&skuNo="+val)
      this.goodsInfo=res.data[0]
      this.image=this.goodsInfo.surPicUrl.split(" ")[0]
      // console.log(this.goodsInfo)
    },
    toComment:function(val,dt){
      
       this.$router.push({
        'path':'/remark',
        query:{
          skuno:val,
          dt:dt
        }
      })
    },
  },

  computed:{
    getStatus(val){
      
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
    this.status=this.$route.query.st
    this.storeNo=this.$route.query.stno
    this.dtCode=this.$route.query.dt
    this.$http.post("storeinfo/selectstore?storeNo="+this.storeNo).then(res=>{
      this.storeName=res.data.rows[0].storeName
    })
    this.getOrderDetail()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderdetails {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f6f6f6;
    overflow: auto;
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
  .contents {
    width: 35.9rem;
    height: 25.1rem;
    background-color: #ffff;
    margin: 0 auto;
    margin-top: 7.4rem;
    border-radius: 0.8rem;
    
  }
  .title {
    width: 100%;
    height: 9.9rem;
    border-bottom: 0.1rem solid #d8d8d8;
    padding-top: 0.3rem;
  }
  .address {
    width: 100%;
    height: 4.2rem;
    line-height: 4.2rem;
    padding-left: 1.2rem;
    font-size: 1.3rem;
    color: #5a5a5a;
  }
  .address img {
    width: 1.5rem;
    height: 1.5rem;
     margin-right: 0.5rem;
     margin-top: -0.3rem;
  }
  .main {
    padding-top: 1.4rem;
  }
   .body {
    width: 100%;
    height: 8.3rem;
    padding-left: 3.2rem;
    padding-right: 1rem;
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
  .foot {
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
  .odinfos {
    width: 35.9rem;
    height: 15.8rem;
    background-color: #ffff;
    margin: 0 auto;
    margin-top: 1rem;
    border-radius: 0.8rem;
    padding-left: 3.2rem;
    padding-top: 0.7rem;
  }
  .ordertitle {
    width: 100%;
    height: 3.6rem;
    line-height: 3.6rem;
    font-size: 1.4rem;
  }
  .orderinfos {
    width: 100%;
    height: 2.45rem;
    line-height: 2.45rem;
    font-size: 1.3rem;
    color: #5e5e5e;
  }
  .orderinfos span {
    margin-left: 3.8rem;
  }
  .orderinfos .status{
    font-size: 1.4rem;
    color: #c59b67;
  }
  .comment {
    width: 100%;
    height: 3.9rem;
    padding-right:2rem ;
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
