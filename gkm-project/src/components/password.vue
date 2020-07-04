<template>
  <div class="password">
   <div class="top">修改密码
      <img src="../img/greyback.png" alt="" class="arror" @click="toMine()">
    </div>
    <div class="modify">
      <div class="modlists">
        <span>原密码</span>
        <input type="password" placeholder="请输入原密码" v-model="prepassword">
      </div>
      <div class="modlists">
        <span>新密码</span>
        <input type="password" placeholder="请输入新密码"  v-model.trim="newpassword" @blur="checkPassword()">
      </div>
      <div class="modlists">
        <span>确认新密码</span>
        <input type="password" placeholder="请再次输入新密码"  v-model="checkpassword" @blur="checkNewPsd()">
      </div>
    </div>
     <button @click="submitPsd()">确认</button>
  </div>
 
</template>

<script>
export default {
  name: 'password',
  data () {
    return {
      prepassword:'',
      newpassword:'',
      checkpassword:'',
      bkUserId:''
    }
  },
  methods:{
    toMine:function(){
      this.$router.push({
        'path':'/mine'
      })
    },
    checkNewPsd:function(){
      if(this.checkpassword!=this.newpassword){
        this.$toast({
            message: '两次密码请保持一致',
            icon: 'fail',
            duration:1000
          });
        this.checkpassword=''
      }
    },
    submitPsd:async function(){
      
      if(this.prepassword!=''&&this.newpassword!=''&&this.checkpassword!=''){     
         var datas={
              "checkPassword": this.checkpassword,
              "newPassword": this.newpassword,
              "oldPassword": this.prepassword,
              "userId": this.bkUserId
            }
            const {data:res}=await this.$http.put("editpassword/editpassword",datas)
            if(res.code!==200)
              return this.$toast({
                  message: res.msg,
                  icon: 'fail',
                  duration:600
                });
            this.$toast({
            message: '修改成功',
            icon: 'success',
            duration:600
          });
           this.prepassword=''
           this.newpassword=''
           this.checkpassword=''
      }
     
    },
    checkPassword:function(){
      if((this.newpassword.length<8&&this.newpassword.length>0)||this.newpassword.length>16){
         this.$toast({
            message: '输入8-16位数字或密码',
            icon: 'fail',
            duration:1000
          });
        this.newpassword=''
      }
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
.password {
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
   .modify{
    width: 35.9rem;
    height: 14rem;
    background-color: #ffff;
    border-radius: 0.8rem;
    margin: 7.4rem auto;
    padding-left: 2.8rem;
    padding-top: 1.75rem;
   }
   .modlists{
     width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
   }
   .modlists span{
    display: inline-block;
    width: 7.3rem;
    font-size: 1.4rem;
    color: #5a5a5a;    
  }
  .modlists input {
    height: 2rem;
    margin-left: 3.9rem;
     font-size: 1.4rem;
    color: #5a5a5a;
  
  }
   input::placeholder {
     font-size: 1.4rem;
     color: #adadad;
   }
</style>
