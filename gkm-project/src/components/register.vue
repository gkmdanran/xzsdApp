<template>
  <div class="register">

      <div class="top">
        <img src="../img/arror.png" alt="" class="arror" @click="backToLogin">
        注册
        <span class="morepoint">···</span>
    </div>
     <div class="logo">
        <img src="../img/logo.png" alt="">     
    </div>
    <div class="reg_sex">
      <div class="checksex" :class="{'sex_checked':1==infos.sex}" @click="checkBoy">
        <div class="sign"><strong>♂</strong></div>
        男
      </div>
      <div class="checksex" :class="{'sex_checked':0==infos.sex}" @click="checkGirl">
         <div class="sign"><strong>♀</strong></div>
        女
      </div>
    </div>
    <div class="reginfos">
      <img src="../img/user.png" alt="">
        <input type="text" placeholder="请输入账号" v-model.trim="infos.username" @blur="checkUname()">
    </div>
    <div class="reginfos">
      <img src="../img/password.png" alt="">
        <input type="password" placeholder="请输入密码" v-model.trim="infos.password" @blur="checkPassword()">
    </div>
    <div class="reginfos">
      <img src="../img/checkpasword.png" alt="">
        <input type="password" placeholder="请确认密码" v-model="infos.checkpassword" @blur="recheckPassword()">
    </div>
    <div class="reginfos">
      <img src="../img/phonenumber.png" alt="">
        <input type="number" placeholder="请输入手机号" v-model="infos.phonenumber" @blur="checkPhonenumber()">
    </div>
    <div class="reginfos">
      <img src="../img/realname.png" alt="">
        <input type="text" placeholder="请输入姓名" v-model.trim="infos.realname">
    </div>
    <div class="reginfos">
      <img src="../img/cardnumber.png" alt="">
        <input type="number" placeholder="请输入身份证号" v-model="infos.cardnumber" @blur="checkCardnumber()">
    </div>
    <div class="reginfos">
      <van-icon name="envelop-o" />
        <input type="text" placeholder="请输入邮箱" v-model="infos.email"  @blur="checkEmail()">
    </div>
    <div class="reginfos">
      <van-icon name="shop" />
        <input type="text" placeholder="请输入店铺邀请码" v-model="infos.inviteCode" >
    </div>
     <button @click="registerInfos()">
        注册
      </button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      infos:{
        sex:1,
        username:'',
        password:'',
        checkpassword:'',
        phonenumber:'',
        realname:'',
        cardnumber:'',
        email:'',
        inviteCode:''
      },
      
    }
  },
  methods:{
    backToLogin:function(){
       this.$router.push({
        'path':'/'
      })
    },
    checkBoy:function(){
      this.infos.sex=1
    },
    checkGirl:function(){
      this.infos.sex=0
    },
    checkUname:function(){
     if(this.infos.username!=''&&!(/^[0-9a-zA-Z]{5,12}$/.test(this.infos.username))){
      this.$toast({
            message: '请输入5-12位数字或字母',
            icon: 'fail',
            duration:1000
          });
          this.infos.username=''
     }
    },
    checkPassword:function(){
      if(!(/^[0-9a-zA-Z]{8,16}$/.test(this.infos.password))&&this.infos.password!=''){ 
          this.$toast({
            message: '请输入8-16位数字或字母',
            icon: 'fail',
            duration:1000
          });
          this.infos.password=''
        }
    },
    recheckPassword:function(){
      if(this.infos.checkpassword!=''){
        if(this.infos.password!=this.infos.checkpassword){
          this.$toast({
            message: '请输入一致的密码',
            icon: 'fail',
            duration:1000
          });
          this.infos.checkpassword=''
        }
      }
      
    },
    checkPhonenumber:function(){
      if(this.infos.phonenumber!=''){
         if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.infos.phonenumber))){ 
          this.$toast({
            message: '手机号有误请重填',
            icon: 'fail',
            duration:1000
          });
          this.infos.phonenumber=''
        }
      }
     
    },
    checkCardnumber:function(){
      var p= /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if(this.infos.cardnumber!=''){
          if(!p.test(this.infos.cardnumber)){
          this.$toast({
            message: '身份证号码有误请重填',
            icon: 'fail',
            duration:1000
          });
          this.infos.cardnumber=''
        }
      }
      
    },
    registerInfos:async function(){
      if(this.infos.sex!=''&&this.infos.username!=''&&this.infos.password!=''&&this.infos.checkpassword!=''&&this.infos.phonenumber!=''&&this.infos.realname!=''&&this.infos.cardnumber!=''){
          var data={
            "email": this.infos.email,
            "idCard": this.infos.cardnumber,
            "inviteCode": this.infos.inviteCode,
            "password": this.infos.password,
            "nickName": this.infos.realname,
            "phone": this.infos.phonenumber,
            "role": 3,
            "sex": this.infos.sex,
            "userName": this.infos.username,
            "userRealname": this.infos.realname
            }
            const{data:res}=await this.$http.post("systemuser/adduser",data)
            if(res.code!==200)
              return this.$toast({
                message: '注册失败',
                icon: 'fail',
                duration:600
              });
             this.$toast({
              message: '注册成功',
              icon: 'success',
              duration:600
            });
            this.$router.push({
              'path':'/'
            })
        
      }
    },
    checkEmail(){
       if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.infos.email))&&this.infos.email!=''){ 
          this.$toast({
            message: '请输入合法邮箱',
            icon: 'fail',
            duration:1000
          });
          this.infos.email=''
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top {
    width: 100%;
    height: 8rem;
    padding-left: 2rem;
    padding-right: 2rem;
    text-align: center;
    line-height: 8rem;
    font-size: 2.4rem;
    color: #c39862;
  }
  .morepoint {
    float: right;
    font-size: 1.6rem;
    font-weight: 700;
  }
  .arror {
    float: left;
    width: 2.3rem;
    height: 2.3rem;
    margin-top: 2.85rem;
  }
  .logo {
  width: 19.1rem;
  height: 5.6rem;
  margin:  auto;
  margin-top: 4.1rem;
}
.logo img {
  width: 100%;
  height: 100%;
}
.reg_sex{
  width: 17.6rem;
  height: 4.95rem;
  margin: 0 auto;
  margin-top: 3.8rem;
  border-radius: 0.3rem;
  overflow: hidden;
  text-align: center;
  
}
.checksex {
  width: 8.8rem;
  height: 4.95rem;
  float: left;
  font-size: 1.4rem;
  color: #cccccc;
}
.reg_sex .sign {
  width: 100%;
  height: 2.8rem;
  background-color: #cccccc;
  line-height: 2.8rem;
  color: #ffffff;
  font-size: 1.7rem;

  
}
.sex_checked{
  color:  #c39862;
}
.sex_checked .sign {
  background-color: #c39862;
}
.reginfos{
  width: 25.5rem;
  height: 3.1rem;
  border-bottom: 0.1rem solid #e8e8e8;
  margin: 1rem auto;
  padding-left: 1.1rem;
  line-height: 3rem;
}
.reginfos img {
  width: 1.5rem;
  height: 1.5rem;
}
.reginfos .van-icon::before {
  font-size: 1.5rem;
  color: #c9a373;
  font-weight: 700;
  vertical-align: middle;

}
.reginfos input {
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
  margin: 1rem auto;
  
  font-size: 2.4rem;
  color: #ffffff;
 
}
</style>
