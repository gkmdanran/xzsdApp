<template>
  <div class="login">
    
      <div class="logo">
        <img src="../img/logo.png" alt="">
        
      </div>
      <div class="username">
        <img src="../img/user.png" alt="">
        <input type="text" placeholder="账号" v-model.trim="loginInfos.userNumber">
      </div>
      <div class="password">
        <img src="../img/password.png" alt="">
        <input type="password" placeholder="密码" v-model="loginInfos.userPassword">
      </div>
      <button @click="toLogin()">
        登录
      </button>
      <div class="others">
        <span class="toforget" @click="forgetPassword">忘记密码</span>
        <span class="toregister" @click=" goToRegister">注册</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginInfos:{
        userNumber:'',
        userPassword:'',
      },
      bkUserId:'123'   //登录成功时返回的用户id
    }
  },
  methods:{
    forgetPassword:function(){
      this.$toast('暂未开放');
    },
    goToRegister:function(){
      this.$router.push({
        'path':'/register'
      })
    },
    async toLogin(){

      if(this.loginInfos.userNumber!=''&&this.loginInfos.userPassword!=''){
                //根据输入的用户名掉借口如果登录成功
        window.sessionStorage.clear()
        var data={
          "password":  this.loginInfos.userPassword,
          "userType": "01",
          "username": this.loginInfos.userNumber
        }

      const{data:res}=await this.$http.post('common/login',data)
      if(res.code!==200){
         this.$toast({
            message: '账号不存在或密码错误',
            icon: 'fail',
            duration:600
          });
      }
      else{
        this.$toast({
            message: '登录成功',
            icon: 'success',
            duration:600
          });
        window.sessionStorage.setItem("apptoken",res.token)
          this.$router.push({
            'path':'/homepage'
          })
      }
        
        
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  overflow: hidden;
}
.logo {
  width: 19.1rem;
  height: 5.6rem;
  margin:  auto;
  margin-top: 12.1rem;
}
.logo img {
  width: 100%;
  height: 100%;
}
.username,
.password {
  width: 25.5rem;
  height: 3.3rem;
  border-bottom: 0.1rem solid #e8e8e8;
  margin: 0 auto;
  padding-left: 1.1rem;
  line-height: 3.2rem;

}
.username {
  margin-top: 11.5rem;
  margin-bottom: 3.5rem;

}
.username img,
.password img {
  width: 1.5rem;
  height: 1.5rem;
}
.username input,
.password input {
  width: 20rem;
  height: 2rem;
  line-height: 2rem;
  margin-left: 1.8rem;
  vertical-align: middle;
  font-size: 1.4rem;
  color: #5a5a5a;
}
input::placeholder {
  color: #dddddd;
  font-size: 1.4rem;
}
button{
  display: block;
  width: 25.2rem;
  height: 4.5rem;
  border-radius: 1rem;
  background-color: #dfb886;
  margin: 6rem auto;
  margin-bottom: 0;
  font-size: 2.4rem;
  color: #ffffff;
 
}
.others {
  width: 25.2rem;
  height: 1.5rem;
  font-size: 1.3rem;
  line-height: 1.5rem;
  margin: 1.5rem auto;
  color: #999999;
}
.toforget{
  float: left;
}
.toregister {
  float: right;
}
</style>
