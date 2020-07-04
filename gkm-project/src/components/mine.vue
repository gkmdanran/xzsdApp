<template>
  <div class="mine">
    <div class="top">个人中心</div>
    <div class="contents">
      <div class="photo">
        <img src="../img/photo.jpg" alt="">
      </div>
      <div class="username" v-text="userName"></div>
      <div class="operatelist">
        <div class="operate" @click="toOrders()">
          <img src="../img/order.png" alt="" class="icons">
          <span>我的订单</span>
          <img src="../img/right.png" alt="" class="arror">
        </div>
        <div class="operate" @click="toPassword()">
          <img src="../img/password.png" alt="" class="icons">
          <span>修改密码</span>
          <img src="../img/right.png" alt="" class="arror">
        </div>
        <div class="operate" @click="toInvite()">
          <img src="../img/erweima.png" alt="" class="icons">
          <span>修改店铺邀请码</span>
          <img src="../img/right.png" alt="" class="arror">
        </div>
        <div class="operate" @click="toLogin()">
          <img src="../img/exit.png" alt="" class="icons">
          <span>退出登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {
     userName:''
    }
  },
  methods:{
    toLogin:async function(){
       var {data:res}=await this.$http.post("common/logout")
            // console.log(res.code)
            if(res.code!==200){
               this.$toast({
                message: '退出异常',
                icon: 'fail',
                duration:600
              });
            }
            else{
                window.sessionStorage.clear()
                this.$router.push({
                  path:'/'
                })
                this.$toast({
                  message: '退出成功',
                  icon: 'success',
                  duration:600
                });
            }       
    },
    toInvite:function(){
      
       this.$router.push({
        'path':'/invite'
      })
    },
    toPassword:function(){
      
       this.$router.push({
        'path':'/password'
      })
    },
     toOrders:function(){
      
       this.$router.push({
        'path':'/orders'
      })
    },
    async getLoginInfo(){
        var {data:res}=await this.$http.get("common/getLoginInfo")
        console.log(res)
        this.userName=res.user.userName
        
    }
  },
  created:function(){
    this.getLoginInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mine {
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
    position: relative;
    width: 100%;
    height: calc(100% - 11rem);
    background-color: #f6f6f6;
    margin-top: 6.4rem;
    overflow: auto;
  }
  .contents .photo {
    position: absolute;
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    overflow: hidden;
    top: 2.2rem;
    left: 4rem;
  }
  .photo img {
    width: 100%;
    height: 100%;
  }
  .username {
    position: absolute;
    width: 18rem;
    height: 3rem;
    top: 3.6rem;
    left: 11.3rem;
    line-height: 3rem;
    font-size: 2.2rem;
  }
  .operatelist {
    width: 35.9rem;
    height: 17.5rem;
    background-color: #ffff;
    border-radius: 0.8rem;
    margin: 9.7rem auto;
    padding-top: 1.75rem;
  }
  .operate {
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
    padding-left: 1.2rem;
    padding-right: 1rem;
  }
  .operate .icons {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    margin-top: -0.7rem;
    
  }
  .operate span{
    font-size: 1.4rem;
    color: #5a5a5a;    
  }
  .operate .arror {
     width: 1.5rem;
    height: 1.5rem;
    float: right;
    margin-top: 1rem;
  }
</style>
