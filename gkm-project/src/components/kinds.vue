<template>
  <div class="kinds">
    <div class="top">分类</div>
    <div class="contents">
      <div class="left">
        <div class="bigkinds" v-for="x in menulist" :key="x.cateCode" @click="menuClick(x.cateCode)" :class="{'selected':x.cateCode==currentmenuid}">
            <div class="txt" v-text="x.cateName"></div>
        </div>
        
      </div>
      <div class="right">
          <div class="kinds" v-for="x in kindslist" :key="x.cateCode">
            <div class="title" v-text="x.cateName" v-if="x.childBooks.length>0"></div>
            <div class="booklist">
              <div class="books" v-for="y in x.childBooks" :key="y.skuNo" @click="toBookDetail(y.skuNo)">
                <img :src="y.surPicUrl.split(' ')[0]" alt="">
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
  </div>
</template>

<script>
export default {
  name: 'kinds',
  data () {
    return {
    kindslist:[],
    menulist:[],
    currentmenuid:''
     
    }
  },
  methods:{
    getKindsList:async function(val){
      const {data:res}=await this.$http.get("cate/getsecond?cateCodeParent="+val)
      // console.log(res)
      var list=[]
      for(let x of res.data){
        var kind={
          cateCode:x.cateCode,
          cateName:x.cateName,
          childBooks:[]
        }
        list.push(kind)
      }
      this.kindslist=list
      this.getBookList()
      // console.log(this.kindslist)
    },
    getMenuList: async function(){
     const {data:res}=await this.$http.get("cate/getfirst")
    
      this.menulist=res.data
      this.currentmenuid=this.menulist[0].cateCode
      
    },
    menuClick:function(val){
      this.currentmenuid=val
      this.getKindsList(val)
    },
    toBookDetail:function(val){
       this.$router.push({
        'path':'/bookdetail',
        query:{
          id:val
        }
      })
    },
    async getBookList(){
      for(let x of this.kindslist){
        var datas={
          status:3,
          cateCode:x.cateCode
        }
        const {data:res}=await this.$http.get("goods/selectall",{params:datas})
        for(let book of res.data){
          if(book.status==1)
          x.childBooks.push(book)
        }
        // x.childBooks=res.data
      }
    }
  },
  created:async function(){
    await this.getMenuList()
    this.getKindsList(this.menulist[0].cateCode)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .kinds {
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
    /* padding-top: 1.25rem; */
  }
  .left {
    float: left;
    width: 8.9rem;
    height: 100%;
    overflow: auto;
    background-color: #ffff;
  }
  .bigkinds {
    width: 100%;
    height: 3.2rem;
    overflow: hidden;
  }
  .bigkinds .txt {
    width: 100%;
    height: 1.8rem;
    margin-top: 0.7rem;
    text-align: center;
    font-size: 1.3rem;
    border-left: 0.3rem solid transparent;
    color: #5a5a5a;
  }
  .left .selected {
    
    background-color: #f6f6f6;
  }
  .left .selected .txt {
    border-color: #dab17e;
    color: #c39862;
  }
  .right {
    width: calc(100% - 11rem);
    height: 100%;
    float: left;
    margin-left: 1rem;
    overflow: auto;
  }
  .right .kinds {
    width: 100%;
    height: auto;
  }
  .kinds .title {
    width: 100%;
    padding-top: 0.7rem;
    height: 3.2rem;
    color: #c39862;
    font-size: 1.3rem;

  }
   .kinds .booklist {
     width: 100%;
     background: #ffff;
     border-radius: 0.8rem;
    overflow: hidden;
   }
   .books {
     float: left;
    width: 50%;
    height: 17.5rem;

    margin-bottom: 2.5rem;
    padding-top: 0.9rem;
   }
   .books img {
     display: block;
     width: 11.5rem;
     height: 11.5rem;
     margin: 0 auto;

   }
   .books .txt {
     width: 100%;
     height: 2.4rem;
     margin-top: 0.7rem;
     padding: 0 0.9rem;
     line-height: 2.4rem;
     font-size: 1.2rem;
     color: #5a5a5a;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
   }
   .books .price {
     width: 100%;
     height: 1.8rem;
     padding: 0 0.9rem;
    line-height: 1.8rem;
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
    margin-left: 0.5rem;
  }
</style>
