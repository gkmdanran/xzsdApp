<template>
  <div class="invite">
    <div class="top">修改绑定店铺
      <img src="../img/greyback.png" alt="" class="arror" @click="toMine()">
    </div>
    <div class="invitema">
      <span>新邀请码</span>
      <input type="text" placeholder="请输入邀请码" v-model.trim="invitemsg">
    </div>
    <button @click="checkInvite()">确认</button>
  </div>
</template>

<script>
export default {
  name: 'invite',
  data () {
    return {
      invitemsg: '',
      bkUserId:''
    }
  },
  methods:{
    checkInvite:async function(){
      if(this.invitemsg!=''){
        const {data:res}=await this.$http.post("systemuser/editinvitecode",{inviteCode:this.invitemsg,userId:this.bkUserId})
        if(res.code!==200)
          return this.$toast({
            message: '修改失败',
            icon: 'fail',
            duration:600
          });
        this.$toast({
            message: '修改成功',
            icon: 'success',
            duration:600
          });
        this.invitemsg=''
      }
    },
    toMine:function(){
      this.$router.push({
        'path':'/mine'
      })
    },
    async getLoginInfo(){
        var {data:res}=await this.$http.get("common/getLoginInfo")
        this.bkUserId=res.user.userId
       
      }
  },
  created:function(){
     this.getLoginInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invite {
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
  .invitema {
    width: 35.9rem;
    height: 7.1rem;
    background-color: #ffff;
    border-radius: 0.8rem;
    margin: 7.4rem auto;
    line-height: 7.1rem;
    padding-left: 2.8rem;
  }
  .invitema span {
    font-size: 1.4rem;
    color: #5a5a5a;
  }
  .invitema input {
    height: 2rem;
    margin-left: 5.5rem;
     font-size: 1.4rem;
    color: #5a5a5a;
  
  }
   input::placeholder {
     font-size: 1.4rem;
     color: #adadad;
   }
   button {
     position: absolute;
     left: 50%;
     transform: translateX(-50%);
     width: 25.2rem;
     height: 4.5rem;
      border-radius: 1rem;
      bottom: 2rem;
      background: linear-gradient(left,#e8c190,#c79d67);
      font-size: 2.4rem;
      color: #ffffff;
   }
</style>
