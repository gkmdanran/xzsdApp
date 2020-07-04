<template>
  <div class="shopcar">
    <div class="top">购物车
      <span @click="clearChecked(1)" v-if="total!=0">删除</span>
    </div>
    <div class="contents">
      <div class="books" v-for="x in carList" :key="x.id">
        <input type="checkbox" v-model="x.checked" @change="changeChecked(x.id,x.checked)">
        <img :src="x.img" alt="">
        <div class="details">
          <div class="txt" v-text="x.txt"></div>
          <div class="infos" v-text="x.infos"></div>
          <div class="pricetotal">
            ￥<span v-text="x.price.toFixed(2)"></span>
            <div class="count">
              <div class="minus" @click="numMinus(x.id)">-</div>
              <input type="number" v-model="x.num" disabled=true>
              <div class="plus" @click="numPlus(x.id)">+</div>
            </div>
          </div>
          
        </div>
      </div>

    </div>
    <div class="gobuy">
      <input type="checkbox" v-model="allchecked" @change="checkAll()">
      <span class="selall" >全选</span>
      <input type="text" class="shippinguser" v-model="shippingUser" placeholder="收货人">
      <button @click="goBuy()">结算(<span class="count" v-text="total"></span>)</button>
      <span class="allmoney" v-text="totalmoney"></span>
      <span class="heji">合计:</span>
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'shopcar',
  data () {
    return {
      carList:[],
      totalmoney:'0.00',
      total:'0',
      allchecked:'',
      bkUserId:'',
      shippingUser:''
    }
  },
  methods:{
    getCarList:async function(){
     const {data:res}=await this.$http.post("car/selectcar",{userCode:this.bkUserId})
    //  console.log(res)
     var list=[]
     for(let x of res.data){
       const {data:goods}=await this.$http.get("goods/selectall?status=3&skuNo="+x.skuNo)
      //  console.log(goods)
       var goodcar={
         id:x.id,
         num:x.cnt,
         price:goods.data[0].sellingPrice,
         img:goods.data[0].surPicUrl.split(" ")[0],
         txt:goods.data[0].advertising,
         infos:'作者：'+goods.data[0].author,
         checked:x.isChecked==1?true:false,
         outsideNo:goods.data[0].outsideNo,
         goodsName:goods.data[0].skuName,
         storeName:goods.data[0].storeName,
         skuNo:goods.data[0].skuNo
       }
       list.push(goodcar)
     }
     this.carList=list
    //  console.log(this.carList)
    },
    getTotalMoney:function(){
      var total=0
      var count=0
      for(var i=0;i<this.carList.length;i++){
        if(true==this.carList[i].checked){
          total+=this.carList[i].num*this.carList[i].price
          count++
        }
      }
      this.totalmoney=total.toFixed(2)
      this.total=count
    },
    async changeChecked(val,check){ 
      var checked=0
      for(var i=0;i<this.carList.length;i++){
        if(true==this.carList[i].checked){
          checked++
        }
      }
      if(checked==this.carList.length&&checked!=0){
        this.allchecked=true
      }
      else{
        this.allchecked=false
      }
      
      const {data:res}=await this.$http.post("car/updatecheck",{id:val,isChecked:check==true?1:0})
      // console.log(res)
      // console.log(isChecked)
       this.getTotalMoney()
      //  console.log(val)
      //改变数据库商品勾选状态
    },
    async checkAll(){     
      if(this.allchecked){
        for(var i=0;i<this.carList.length;i++){
          this.carList[i].checked=true
        }
      }
      else {
        for(var i=0;i<this.carList.length;i++){
          this.carList[i].checked=false
        }
      }
      for(let x of this.carList){
         const {data:res}=await this.$http.post("car/updatecheck",{id:x.id,isChecked:this.allchecked==true?1:0})
      }
      this.getTotalMoney()
     //改变数据库商品勾选状态
    },
    numMinus:async function(val){
      for (var i=0;i<this.carList.length;i++){
        if(this.carList[i].id==val){
          var index=i;
          break
        }
      }
      if(this.carList[index].num<=1){
        this.carList[index].num=1
      }
      else {
        this.carList[index].num--
      }
      const {data:res}=await this.$http.post("car/updatecnt",{"cnt": this.carList[index].num,"id": this.carList[i].id})
      this.getTotalMoney()
      
      
      //改变数据库数量
    },
    numPlus:async function(val){
      for (var i=0;i<this.carList.length;i++){
        if(this.carList[i].id==val){
          var index=i;
          break;
        }
      }
      if(this.carList[index].num>=99){
        this.carList[index].num=99
      }
      else {
        this.carList[index].num++
      }
      const {data:res}=await this.$http.post("car/updatecnt",{"cnt": this.carList[index].num,"id": this.carList[i].id})
      this.getTotalMoney()
      //  console.log(this.carList[i].id)
      //改变数据库数量
    },
    clearChecked:async function(val){
      // var list=[]
      // for(var i=0 ;i<this.carList.length;i++){
      //   if(this.carList[i].checked==false){
      //       list.push(this.carList[i])
      //   }
      // }
      // 
      const {data:res}=await this.$http.post("car/delcar")
      if(res.code!==200)
      if(this.carList.length==0)
      return this.$toast({
            message: '操作失败',
            icon: 'fail',
            duration:600
          });
      if(val==1){
         this.$toast({
            message: '删除成功',
            icon: 'success',
            duration:600
          });
      }
      else{
         this.$toast({
            message: '购买成功',
            icon: 'success',
            duration:600
          });
      }
      this.allchecked=false  
      
      await this.getCarList()
      this.getTotalMoney()
      // this.$toast({
      //       message: '删除成功',
      //       icon: 'success',
      //       duration:600
      //     });
      //改变数据库
    },
    goBuy:async function(){
      if(this.total!=0){
        if(this.shippingUser.trim()=='')
          return  this.$toast({
            message: '请输收货人姓名',
            icon: 'fail',
            duration:600
          });
        var buylist=[]
        for(var i=0;i<this.carList.length;i++){
          if(this.carList[i].checked==true)
          buylist.push(this.carList[i])
        }
        // console.log(buylist)
        // console.log(this.totalmoney)
        var storeList=[]
        for(let x of buylist){     
          storeList.push({                 
              "districtMoney": 0,
              "orderDetails": [],
              "shippingUser": this.shippingUser,
              "storeName": x.storeName,
              "storeNo": x.outsideNo,
          })           
        }
        // console.log(storeList)
        var result = [];
        var obj = {};
        for(var i =0; i<storeList.length; i++){
          if(!obj[storeList[i].storeNo]){
            result.push(storeList[i]);
            obj[storeList[i].storeNo] = true;
          }
        }
        for(var i=0 ;i<result.length;i++){
          for(var j=0;j<buylist.length;j++){
            if(result[i].storeNo==buylist[j].outsideNo){
              result[i].orderDetails.push(
                {
                   "goodsCnt": buylist[j].num,
                    "goodsName": buylist[j].goodsName,
                    "goodsPrice":  buylist[j].price,
                    "skuNo":  buylist[j].skuNo,
                }
              )
            }
          }
        }
        console.log(result)
        const{data:res}=await this.$http.post("order/insertorder",result)
        console.log(res)
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
      this.clearChecked()
       this.$router.push({
            'path':'/orders'
          })

        
        //改变数据库
      }
    },
    async getLoginInfo(){
        var {data:res}=await this.$http.get("common/getLoginInfo")
        this.bkUserId=res.user.userId
       
    },
    

  },
  created:async function(){
    // this.bkUserId=localStorage.getItem('bkUserId')
    await this.getLoginInfo()
    await this.getCarList()
    this.getTotalMoney()
    this.changeChecked()   
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .shopcar {
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
  .top span {
    position: absolute;
    font-size:1.6rem;
    right: 2rem;
    top: 3rem;

  }
  .contents {
    width: 100%;
    height: calc(100% - 15.5rem);
    background-color: #f6f6f6;
    margin-top: 6.4rem;
    overflow: auto;
  }
  .gobuy {
    position: fixed;
    width: 100%;
    height: 4.5rem;
    bottom: 4.6rem;
    line-height: 4.5rem;
  }
  .gobuy input {
    vertical-align: middle;
    width: 1.4rem;
    height: 1.4rem;
    margin:  0 1rem;
    margin-top: -0.3rem;
    margin-left: 1.9rem;
  }
  .gobuy .selall {
    font-size: 1.3rem;
    color: #bababa;
  }
  .gobuy .heji {
    float: right;
    font-size: 1rem;
    color: #636363;
  }
  button {
    float: right;
    width: 9.7rem;
    height: 3.5rem;
    margin: 0.5rem 0.8rem 0.5rem 1.5rem;
    border-radius: 0.8rem;
    background: linear-gradient(left,#e7bf8e,#caa06b);
    color: #ffffff;
    font-size: 1.4rem;
    line-height: 3.5rem;
  }
  .gobuy .allmoney {
    float: right;
    margin-left: 0.6rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #f30404;
  }
  .contents .books {
    position: relative;
    width: 35.9rem;
    height: 13.4rem;
    background-color: #ffffff;
    border-radius: 1rem;
    margin: 1rem auto;
    line-height: 13.4rem;
  }
  .books input {
    vertical-align: middle;
    width: 1.4rem;
    height: 1.4rem;
    margin: 1.1rem;
  }
  .books img {
    width: 8.3rem;
    height: 8.3rem;
    border-radius: 0.3rem;
    margin-right: 0.9rem;
  }
  .books .details{
    width: 21.7rem;
    height: 8.3rem;
    position: absolute;
    top: 2.5rem;
    right: 1.2rem;
    padding-top: 0.2rem;
  }
  .details .txt {
    width: 100%;
    height: 3.7rem;
    line-height: 1.8rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 1.2rem;
    color: #5a5a5a;
  }
  .details .infos {
    width: 100%;
    height: 1.4rem;
    margin-top: 0.3rem;
    font-size: 1rem;
    line-height: 1rem;
    color: #aeaeae;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pricetotal {
    width: 100%;
    height: 1.8rem;

    margin-top: 1rem;
    font-size: 0.8rem;
    line-height: 1.8rem;
    color: #f30000;
    font-weight: 700;
  }
  .pricetotal span {
    font-size: 1.2rem;
  }
  .pricetotal .count {
    width: 7.4rem;
    height: 1.8rem;
    float: right;
    border: 0.1rem solid  #d8d8d8;
    border-radius: 0.3rem;
    position: relative;
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
    color: #5a5a5a;
    font-weight: 400;
    
  }
  .count input {
    text-align: center;
    font-size:1.2rem
  }
.shippinguser{
    margin-left: 0.5rem!important;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    height: 2.5rem!important;
    width: 8rem!important;
    padding: 0 1rem;
  }
</style>
